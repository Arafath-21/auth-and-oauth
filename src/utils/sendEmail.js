import nodemailer from 'nodemailer';

/**
 * Sends an email using Nodemailer.
 *
 * @param {Object} options - The options for sending the email.
 * @param {string} options.email - The recipient's email address.
 * @param {string} options.subject - The subject of the email.
 * @param {string} options.message - The content of the email.
 * @returns {Promise<void>} A promise that resolves when the email is sent.
 * @throws {Error} Throws an error if the email could not be sent.
 */
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmail;
