import jwt from 'jsonwebtoken';

/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 *
 * @param {string} id - The ID of the user for whom the token is generated.
 * @returns {string} The generated JWT.
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export default generateToken;
