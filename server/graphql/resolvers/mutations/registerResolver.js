const UserModel = require('../../../models/UserModel')
const { generateAuthToken } = require('../../../utils/helpers')
const errors = require('../../../utils/errors')

module.exports = async (_, { username, password }) => {
  if (await UserModel.findByUsername(username)) {
    throw new errors.UserAlreadyExists()
  }

  const user = new UserModel({ username, password })

  const token = generateAuthToken(user._id.toString())

  await user.save()

  return {
    user,
    token
  }
}
