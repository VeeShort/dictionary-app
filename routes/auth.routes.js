const {Router, request} = require('express');
const {check, validationResult} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const router = Router();

// /api/auth/register
router.post(
  '/register',
  // midleware array
  [
    check('email', 'Wrong email').normalizeEmail().isEmail(),
    check('password', 'Password should contain at least 6 characters').isLength({ min: 6 }),
  ],
  async (request, response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
        message: 'Wrong registration data',
      });
    }

    const { email, password } = request.body;

    // find potential user (canditate) in the DB
    const candidate = await User.findOne({ email });
    
    // check if user is already in DB
    if (candidate) {
      // 403 - status code for "Already exists"
      return response.status(403).json({ message: 'User already exists' });
    }

    // encrypt user password (hash) and create new User with hashed password and email
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword });

    // wait for DB to create and save new user
    await user.save();

    // send successful response to FE after user is created
    response.status(201).json({ message: 'User successfully created' });

  } catch (err) {
    response.status(500).json({message: 'Something went wrong, try again'});
  }
});

// /api/auth/login
router.post(
  '/login',
  // validators array
  [
    check('email', 'Wrong email received').normalizeEmail().isEmail(),
    check('password', 'Wrong password length received')
      .isLength({ min: 6 }),
  ],
  async (request, response) => {
  try {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.status(400).json({
        errors: errors.array(),
        message: 'Wrong sign in data',
      });
    }

    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(400).json({ message: 'User not found' });
    }

    // compare received password with stored password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return response.status(400).json({ message: 'Incorrect password' });
    }

    // jwt token auth
    const token = jwt.sign(
      { userId: user.id },
      config.get('jwtSecret'),
      { expiresIn: '3h' },
    );

    response.json({ token, userId: user.id, message: 'Successfully signed in' });

  } catch (err) {
    response.status(500).json({message: 'Something went wrong, try again'});
  }
});

module.exports = router;
