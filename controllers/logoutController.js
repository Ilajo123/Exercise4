const User = require('../data/User');

const handleLogout = async (req,res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.sendStatus(204);
  }
  const refreshToken = cookies.jwt;
  const foundUser = await User.findOne({refreshToken}).exec();
  if (!foundUser) {
    res.clearCookie('jwt', {httpOnly: true, sameSite: 'None'});
    return sendStatus(204);
  }
  try {
    foundUser.refreshToken = "";
    const result = await foundUser.save();
    console.log(result);
  }catch(err) {
    console.log(err.message);
  }
  
  res.clearCookie('jwt', {httpOnly: true, sameSite: 'None'});
  res.sendStatus(204);
}

module.exports = {handleLogout};