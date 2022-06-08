const UserModel = require('../../../models/UserModel')

module.exports = async (_, args) => {
  const user = await UserModel.findById(args._id)
  
  if (user) {
    return user
  }

  throw new Error('User does not exist')
}
