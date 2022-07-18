const Joi = require('joi')
const { Types } = require('mongoose')
const QuziModel = require('../../../models/QuizModel')
const errors = require('../../../utils/errors')

const schema = Joi.object({

})

module.exports = async (parent, { quizId }, ctx) => {
  if (ctx.user) {
    throw new errors.NotAuthenticatedError()
  }

  quizId = new Types.ObjectId(quizId)

  const updatedQuiz = await QuziModel.updateOne({ _id: quizId }, {
    $inc: {
      numTries: 1
    }
  }, { new: true })

  return updatedQuiz.numTries
}
