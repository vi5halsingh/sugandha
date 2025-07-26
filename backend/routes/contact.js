const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const router = express.Router();

// @desc    Send contact form
// @route   POST /api/contact
// @access  Public
router.post('/', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('subject')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Subject must be between 5 and 100 characters'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Please provide a valid 10-digit phone number')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, subject, message, phone } = req.body;

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to admin
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from Sherry Honey website contact form</small></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Sherry Honey',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <p>${message}</p>
        <hr>
        <p>Best regards,<br>Sherry Honey Team</p>
      `
    };

    await transporter.sendMail(confirmationMail);

    res.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @desc    Send support request
// @route   POST /api/contact/support
// @access  Public
router.post('/support', [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('issue')
    .trim()
    .isLength({ min: 10, max: 500 })
    .withMessage('Issue description must be between 10 and 500 characters'),
  body('orderNumber')
    .optional()
    .trim()
    .matches(/^SH[0-9]{9}$/)
    .withMessage('Please provide a valid order number'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high', 'urgent'])
    .withMessage('Valid priority level is required')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { name, email, issue, orderNumber, priority = 'medium' } = req.body;

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to support team
      subject: `Support Request [${priority.toUpperCase()}]: ${orderNumber || 'No Order'}`,
      html: `
        <h2>New Support Request</h2>
        <p><strong>Priority:</strong> <span style="color: ${priority === 'urgent' ? 'red' : priority === 'high' ? 'orange' : 'blue'}">${priority.toUpperCase()}</span></p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${orderNumber ? `<p><strong>Order Number:</strong> ${orderNumber}</p>` : ''}
        <p><strong>Issue:</strong></p>
        <p>${issue.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Support request from Sherry Honey website</small></p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to user
    const confirmationMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Support Request Received - Sherry Honey',
      html: `
        <h2>Support Request Received</h2>
        <p>Dear ${name},</p>
        <p>We have received your support request and our team will address it as soon as possible.</p>
        <p><strong>Your issue:</strong></p>
        <p>${issue}</p>
        ${orderNumber ? `<p><strong>Order Number:</strong> ${orderNumber}</p>` : ''}
        <p><strong>Priority:</strong> ${priority.toUpperCase()}</p>
        <hr>
        <p>We typically respond within 24 hours.</p>
        <p>Best regards,<br>Sherry Honey Support Team</p>
      `
    };

    await transporter.sendMail(confirmationMail);

    res.json({
      success: true,
      message: 'Your support request has been submitted successfully. We will get back to you soon!'
    });
  } catch (error) {
    console.error('Support request error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// @desc    Send newsletter subscription
// @route   POST /api/contact/newsletter
// @access  Public
router.post('/newsletter', [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters')
], async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, name } = req.body;

    // Create email transporter
    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Welcome email
    const welcomeMail = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to Sherry Honey Newsletter!',
      html: `
        <h2>Welcome to Sherry Honey!</h2>
        <p>Dear ${name || 'Valued Customer'},</p>
        <p>Thank you for subscribing to our newsletter! You'll now receive updates about:</p>
        <ul>
          <li>New product launches</li>
          <li>Special offers and discounts</li>
          <li>Health benefits of honey and sherry</li>
          <li>Recipes and usage tips</li>
        </ul>
        <p>Stay tuned for amazing content!</p>
        <hr>
        <p>Best regards,<br>Sherry Honey Team</p>
        <p><small>You can unsubscribe at any time by clicking the link in our emails.</small></p>
      `
    };

    await transporter.sendMail(welcomeMail);

    res.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

module.exports = router; 