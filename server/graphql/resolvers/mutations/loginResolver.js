const UserModel = require('../../../models/UserModel')
const errors = require('../../../utils/errors')
const { generateAuthToken } = require('../../../utils/helpers')
const Joi = require('joi')

const schema = Joi.object({
  username: Joi.string().trim().min(3).max(20),
  password: Joi.string().trim().min(3).max(20)
})

module.exports = async (_, variables) => {
  const { error, value } = schema.validate(variables)

  if (error) {
    throw new errors.ValidationError()
  }

  const { username, password } = value

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
