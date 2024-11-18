const User = require('../models/user');

exports.registerUser = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  await newUser.save();
  res.send('User registered successfully');
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).send('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).send('Invalid email or password');
  }

  req.session.user = user;
  res.send('User logged in successfully');
};

exports.logoutUser = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Could not log out');
    }
    res.send('User logged out successfully');
  });
};
