const { Types } = require('mongoose')
const QuizModel = require('../../../models/QuizModel')
const errors = require('../../../utils/errors')

module.exports = async (parent, { quizId }, ctx) => {
  const currentUser = ctx.user

  if (!currentUser) {
    throw new errors.NotAuthenticated()
  }

  quizId = new Types.ObjectId(quizId)

  await QuizModel.updateOne({ _id: quizId }, {
    $pull: {
      likes: currentUser._id
    }
  })

  return 'good'
}
