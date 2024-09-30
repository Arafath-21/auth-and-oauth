import bcrypt from 'bcryptjs';

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The password entered by the user.
 * @returns {Promise<string>} - A promise that resolves to the hashed password.
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export default hashPassword;
