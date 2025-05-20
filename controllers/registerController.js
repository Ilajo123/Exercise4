const User = require('../data/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req,res) => {
  const {user, pwd} = req.body;
  if (!user || !pwd) {
    return res.status(400).json({"message": "Required Username and Password"});
  }
  const duplicate = await User.findOne({username:user}).exec();
  if (duplicate) {
    return res.sendStatus(409);
  }

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      "username": user,
      "password": hashedPwd
    });
    res.status(201).json({"success":"Created New User"});
  } catch(err) {
    return res.status(500).json(err.message);
  }  
}

module.exports = {handleNewUser};