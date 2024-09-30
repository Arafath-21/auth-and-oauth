import userModel from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import hashPassword from '../utils/hashPassword.js';
import genrateToken from '../utils/genrateToken.js';
import sendEmail from '../utils/sendEmail.js';
import comparePasswords from '../utils/comparePassword.js';
import verifyToken from '../utils/verifyToken.js';

/**
 * Registers a new user, hashes their password, and sends an email for verification.
 *
 * @async
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a JSON response with a success message if registration is successful.
 * @throws {Error} Throws an error if the user already exists or if email verification fails.
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('user already exists, try to login/forgot password');
  }
  const hashedPassword = await hashPassword(password);
  const user = await userModel.create({
    name,
    email,
    password: hashedPassword,
  });
  const verificationToken = genrateToken(user._id);
  const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify/${verificationToken}`;
  const message = `Please verify your email by clicking on the following link: ${verificationUrl}`;

  await sendEmail({
    email: user.email,
    subject: 'Email Verification',
    message,
  });

  res.status(201).json({
    message:
      'User registered successfully. Please check your email to verify your account.',
  });
});
/**
 * Verifies a user's email address using the provided token.
 *
 * @async
 * @param {Object} req - The Express request object.
 * @param {string} req.body.token - The token sent for email verification.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a success message if verification is successful.
 * @throws {Error} Throws an error if the token is invalid or the user is not found.
 */
const verifyUser = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const decoded = verifyToken(token);
  const user = await userModel.findById(decoded.id);
  if (!user) {
    res.status(400);
    throw new Error('invalid token');
  }
  user.isVerified = true;
  await user.save();
  res.status(200).json({
    message: 'Email verified successfully. You can now log in.',
  });
});

/**
 * Logs in a user by verifying their email and password.
 *
 * @async
 * @param {Object} req - The Express request object.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.password - The user's password.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a JSON response with the user's details and a token if login is successful.
 * @throws {Error} Throws an error if the email or password is invalid, or if the user is not verified.
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (user && (await comparePasswords(password, user.password))) {
    if (!user.isVerified) {
      res.status(400);
      throw new Error('Please verify your email to log in');
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: genrateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

/**
 * Sends a password reset email to the user with a reset link.
 *
 * @async
 * @param {Object} req - The Express request object.
 * @param {string} req.body.email - The user's email address.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a success message if the email is sent successfully.
 * @throws {Error} Throws an error if the user is not found.
 */
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  // Find the user by email
  const user = await userModel.findOne({ email });

  // If the user does not exist, return a 404 error
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Generate a reset token
  const resetToken = genrateToken(user._id); // Fixed typo here

  // Construct the reset URL
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset/${resetToken}`;

  // Message to be sent in the email
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: ${resetUrl}`;

  // Send the email
  await sendEmail({
    email: user.email,
    subject: 'Password Reset',
    message,
  });

  // Respond to the request
  res.status(200).json({
    message: 'Email sent',
  });
});

/**
 * Resets a user's password after verifying the token.
 *
 * @async
 * @param {Object} req - The Express request object.
 * @param {string} req.params.token - The token sent for password reset.
 * @param {string} req.body.password - The new password provided by the user.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} Sends a success message if the password is reset successfully.
 * @throws {Error} Throws an error if the token is invalid or the user is not found.
 */
const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const decoded = verifyToken(token);

  const user = await userModel.findById(decoded.id);

  if (!user) {
    res.status(400);
    throw new Error('Invalid token');
  }

  user.password = await hashPassword(password);
  await user.save();

  res.status(200).json({
    message: 'Password reset successfully',
  });
});

export default {
  registerUser,
  verifyUser,
  loginUser,
  forgotPassword,
  resetPassword,
};
