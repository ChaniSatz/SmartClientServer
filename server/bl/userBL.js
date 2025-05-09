const userDL = require('../dal/DAL.js');

class UserBL {
  async getUserById(userId) {
    return await userDL.getUserById(userId);
  }

  async getAllUsers() {
    return await userDL.getAllUsers();
  }

  async createUser(userData) {
    // Add validation logic here
    return await userDL.createUser(userData);
  }

  async updateUser(userId, userData) {
    // Add validation logic here
    return await userDL.updateUser(userId, userData);
  }

  async deleteUser(userId) {
    return await userDL.deleteUser(userId);
  }
}

module.exports = new UserBL();