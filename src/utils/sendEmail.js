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
  try {
    // Create a transporter using Gmail SMTP service
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password (if 2FA is enabled)
      },
    });
    console.log(process.env.EMAIL_USER);

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender's email address
      to: options.email, // Recipient's email address
      subject: options.subject, // Email subject
      text: options.message, // Email body (plain text)
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Failed to send email:', error);
    throw new Error('Email could not be sent');
  }
};

export default sendEmail;
