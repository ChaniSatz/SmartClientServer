const { retry } = require('statuses');
const { findUserByUsername } = require('../dal/DAL');
const bcrypt = require('bcrypt');

const checkPassword = async (plainPassword, password) => {
  return plainPassword == password;

};



const loginUser = async (username, plainPassword) => {
  const user = await findUserByUsername(username, "users");

  if (!user) {
    console.log('Invalid credentials');
    return false;
  }

  const match = await checkPassword(plainPassword, user.password_hash);

if (match) {
    console.log(user);
  const { id, username, email } = user;

  console.log('Login successful!');
  
  return { id, username, email };
}

  else {
    console.log('Invalid credentials');
    return false;
  }
};

module.exports = { loginUser };
