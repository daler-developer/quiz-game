const { Types } = require('mongoose')
const QuziModel = require('../../../models/QuizModel')

module.exports = async (parent, { quizId }, ctx) => {
  quizId = new Types.ObjectId(quizId)

  const updatedQuiz = await QuziModel.updateOne({ _id: quizId }, {
    $inc: {
      numTries: 1
    }
  }, { new: true })

  return updatedQuiz.numTries
}
