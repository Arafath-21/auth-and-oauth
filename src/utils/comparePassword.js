import bcrypt from 'bcryptjs';

/**
 * Compares a plaintext password with a hashed password.
 *
 * @param {string} password - The plaintext password entered by the user.
 * @param {string} hashedPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, false otherwise.
 */
const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export default comparePasswords;
