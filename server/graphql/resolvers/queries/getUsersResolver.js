const UserModel = require('../../../models/UserModel')

module.exports = async (parent, args, ctx) => {
  const users = await UserModel.find({})

  return users
}
