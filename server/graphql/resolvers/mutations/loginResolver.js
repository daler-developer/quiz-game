const UserModel = require('../../../models/UserModel')
const errors = require('../../../utils/errors')
const { generateAuthToken } = require('../../../utils/helpers')

module.exports = async (_, { username, password }) => {
  const user = await UserModel.findByUsername(username)

  if (!user) {
    throw new errors.UserNotFound()
  }

  if (user.password !== password) {
    throw new errors.IncorrectPassword()
  }

  const token = generateAuthToken(user._id)
  
  return { user, token }
}
