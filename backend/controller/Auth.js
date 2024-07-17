const { User } = require('../model/User');
const crypto = require('crypto');
const { sanitizeUser, sendMail } = require('../services/common');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  try {
    // Check if password is provided
    if (!req.body.password) {
      return res.status(400).json({ error: 'Password is required' });
    }

    // Generate a random salt
    const salt = crypto.randomBytes(16);

    // Hash the password with the generated salt
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        if (err) {
          console.error('Error during password hashing:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }

        // Extract role from the request body
        const { email, role, name } = req.body;

        // Create a new user with the hashed password and salt
        const user = new User({
          email,
          password: hashedPassword,
          salt,
          role, // Use the role provided in the request body
          name,
        });

        try {
          // Save the user to the database
          const savedUser = await user.save();

          // Log in the user by creating a JWT token
          const token = jwt.sign(
            { id: savedUser.id, role: savedUser.role },
            process.env.JWT_SECRET_KEY
          );

          // Set the JWT token as a cookie and send the response
          res
            .cookie('jwt', token, {
              expires: new Date(Date.now() + 3600000),
              httpOnly: true,
            })
            .status(201)
            .json({ id: savedUser.id, role: savedUser.role });
        } catch (saveError) {
          console.error('Error saving user to the database:', saveError);
          return res.status(500).json({ error: 'Internal server error' });
        }
      }
    );
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};



exports.loginUser = async (req, res) => {
  const user = req.user;
  res
    .cookie('jwt', user.token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(201)
    .json({ id: user.id, role: user.role });
};

exports.logout = async (req, res) => {
  res
    .cookie('jwt', null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .sendStatus(200)
};

exports.checkAuth = async (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
};

exports.resetPasswordRequest = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email: email });
  if (user) {
    const token = crypto.randomBytes(48).toString('hex');
    user.resetPasswordToken = token;
    await user.save();

    // Also set token in email
    const resetPageLink =
      'http://localhost:3000/reset-password?token=' + token + '&email=' + email;
    const subject = 'reset password for Import Management System for Medab Pharmaceutical & Medical Equipment Import and Distributer Company';
    const html = `<p>Click <a href='${resetPageLink}'>here</a> to Reset Password</p>`;

    // lets send email and a token in the mail body so we can verify that user has clicked right link

    if (email) {
      const response = await sendMail({ to: email, subject, html });
      res.json(response);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(400);
  }
};

exports.resetPassword = async (req, res) => {
  const { email, password, token } = req.body;

  const user = await User.findOne({ email: email, resetPasswordToken: token });
  if (user) {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(
      req.body.password,
      salt,
      310000,
      32,
      'sha256',
      async function (err, hashedPassword) {
        user.password = hashedPassword;
        user.salt = salt;
        await user.save();
        const subject = 'password successfully reset';
        const html = `<p>Successfully able to Reset Password</p>`;
        if (email) {
          const response = await sendMail({ to: email, subject, html });
          res.json(response);
        } else {
          res.sendStatus(400);
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
};
