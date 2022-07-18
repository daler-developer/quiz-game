const { Types } = require('mongoose')
const QuizModel = require('../../../models/QuizModel')
const errors = require('../../../utils/errors')
const Joi = require('joi')

const schema = Joi.object({
  quizId: Joi.string().required()
})

module.exports = async (parent, variables, ctx) => {
  const currentUser = ctx.user

  if (!currentUser) {
    throw new errors.NotAuthenticatedError()
  }

  const { error, value } = schema.validate(variables)

  if (error) {
    throw new errors.ValidationError()
  }

  const { quizId } = value
  
  quizId = new Types.ObjectId(quizId)

  const quiz = await QuizModel.findOne({ _id: quizId })

  if (!quiz) {
    throw new errors.QuizNotFoundError()
  }

  if (!quiz.creatorId.equals(currentUser._id)) {
    throw new errors.ForbiddenToDeleteQuizError()
  }

  await QuizModel.deleteOne({ _id: quizId })

  return 'deleted'
}
