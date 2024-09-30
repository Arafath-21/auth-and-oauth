import jwt from 'jsonwebtoken';

/**
 * Verifies a JSON Web Token (JWT) and decodes its payload.
 *
 * @param {string} token - The JWT to be verified.
 * @returns {object} The decoded payload of the token if valid, or throws an error if invalid.
 * @throws {JsonWebTokenError} If the token is invalid or expired.
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export default verifyToken;
