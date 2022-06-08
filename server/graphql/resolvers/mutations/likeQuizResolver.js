const { Types } = require('mongoose')
const QuizModel = require('../../../models/QuizModel')
const errors = require('../../../utils/errors')

module.exports = async (parent, { quizId }, ctx) => {
  const currentUser = ctx.user

  quizId = new Types.ObjectId(quizId)

  if (!currentUser) {
    throw new errors.NotAuthenticated()
  }

  await QuizModel.updateOne({ _id: quizId }, {
    $push: {
      likes: currentUser._id
    }
  })

  return 'good'
}
