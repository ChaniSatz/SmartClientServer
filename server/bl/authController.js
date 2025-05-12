const { retry } = require('statuses');
const { findUserByUsername } = require('../dal/DAL');
const bcrypt = require('bcrypt');

const checkPassword = async (plainPassword, hashedPassword) => {
  return plainPassword==hashedPassword;
  // const match = await bcrypt.compare(plainPassword, hashedPassword);
  // return match;
};
// const checkPassword = async (plainPassword, hashedPassword) => {
//   const match = await bcrypt.compare(plainPassword, hashedPassword);
//   return match;
// };


const loginUser = async (username, plainPassword) => {
  const user = await findUserByUsername(username,"users");

  if (!user) {
    console.log('Invalid credentials');
    return false;
  }

  const match = await checkPassword(plainPassword, user.password_hash);

  if (match) {
    console.log('Login successful!');
    return user;  
  } else {
    console.log('Invalid credentials');
    return false;
  }
};

module.exports = { loginUser };
