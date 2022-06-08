const { Types } = require('mongoose')
const QuizModel = require('../../../models/QuizModel')

module.exports = async (parent, { quizId }, ctx) => {
  const currentUser = ctx.user
  
  quizId = new Types.ObjectId(quizId)

  await QuizModel.deleteOne({ _id: quizId })

  return 'done'
}
