const User = require('../data/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const handleLogin =  async (req,res) => {
  const user = req.body.user;
  const pwd  = req.body.pwd;
  if (!user || !pwd) {
    return res.status(400).json({"message": "Username and Password Required"})
  }
 
  const foundUser = await User.findOne({username:user}).exec();
  if (!foundUser) {
    return res.sendStatus(401);
  }
  const match = bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles); // return the value of foundUser.roles
    const accessToken = jwt.sign(
      {
        "UserInfo": {
          "username": foundUser.username,
          "roles": roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn:'60s'}
    );
    const refreshToken = jwt.sign(
      {"username": foundUser.username},
      process.env.REFRESH_TOKEN_SECRET,
      {expiresIn: '1d'}
    );
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie('jwt',refreshToken, {httpOnly:true, sameSite: 'None', maxAge: 24 *40 *60 *1000});
    res.json({accessToken});

  } else {
    res.sendStatus(401);
  }
  
};

module.exports = {handleLogin};
