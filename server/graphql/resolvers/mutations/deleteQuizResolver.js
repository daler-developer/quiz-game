const { Types } = require('mongoose')
const QuizModel = require('../../../models/QuizModel')
const errors = require('../../../utils/errors')
const Joi = require('joi')

const schema = Joi.object({

})

module.exports = async (parent, { quizId }, ctx) => {
  const currentUser = ctx.user

  if (!currentUser) {
    throw new errors.NotAuthenticatedError()
  }
  
  quizId = new Types.ObjectId(quizId)

  const quiz = await QuizModel.findOne({ _id: quizId })

  if (!quiz) {
    throw new errors.QuizNotFoundError()
  }

  if (!quiz.creatorId.equals(currentUser._id)) {
    throw new errors.ForbiddenToDeleteQuizError()
  }

  await QuizModel.deleteOne({ _id: quizId })

  return 'done'
}
