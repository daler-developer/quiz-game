const UserModel = require('../../../models/UserModel')
const { generateAuthToken } = require('../../../utils/helpers')
const errors = require('../../../utils/errors')
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
