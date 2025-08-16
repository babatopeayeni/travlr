const passport = require('passport');
const User = require('../models/user');

// POST /api/register
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields required' });
    }

    // Ensure email uniqueness (optional but recommended)
    const existing = await User.findOne({ email }).exec();
    if (existing) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = new User({ name, email, password: '' });
    user.setPassword(password);            // assumes your model defines setPassword
    await user.save();

    const token = user.generateJWT();      // assumes your model defines generateJWT
    return res.status(201).json({ token });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: 'Registration failed', error: err.message });
  }
};

// POST /api/login
const login = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: 'All fields required' });
  }

  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ message: 'Auth error', error: err.message });
    if (!user) return res.status(401).json(info || { message: 'Invalid credentials' });

    const token = user.generateJWT();
    return res.status(200).json({ token });
  })(req, res, next);
};

module.exports = { register, login };
