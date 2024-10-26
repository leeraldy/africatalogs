const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//user registration
const register = async (req, res) => {
  // console.log(req)
  try {
    //hashing password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json({ success: true, message: 'Successfully created' });
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ success: false, message: 'Failed to create. Try again' });
  }
};
//user login
const login = async (req, res) => {
  console.log(req.body)
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    console.log(user)

    //if user doesn't exist
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    //if user is exist then check the password or compare the password
    const checkCorrectPaswword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //if password is incorrect
    if (!checkCorrectPaswword) {
      return res
        .status(401)
        .json({ success: false, message: 'Incorrect email or password ' });
    }

    const { password, role, ...rest } = user._doc;

    //create jwt token

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '15d' }
    );

    //set token in the browser cookies and send the response to the client
    res
      .cookie('accessToken', token, {
        httpOnly: true,
        expires: token.expiresIn,
      })
      .status(200)
      .json({
        token,
        data: { ...rest },
        role,
      });
  } catch (err) {
    console.log(err)
    res.status(500).json({ success: false, message: 'Failed to login' });
  }
};

module.exports = { login, register };
