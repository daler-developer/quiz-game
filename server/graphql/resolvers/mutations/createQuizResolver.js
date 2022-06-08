const { Types } = require('mongoose')
const QuizModel = require("../../../models/QuizModel")
const errors = require('../../../utils/errors')

module.exports = async (_, { name, questions }, ctx) => {
  const currentUser = ctx.user

  if (!currentUser) {
    throw new errors.NotAuthenticated()
  }

  const createdQuiz = await QuizModel.create({
    name,
    creatorId: currentUser._id, 
    questions
  })
  
  const [quiz] = await QuizModel.aggregate([
    {
      $match: { _id: new Types.ObjectId(createdQuiz._id) }
    },
    {
      $lookup: {
        as: 'creators', localField: 'creatorId', foreignField: '_id', from: 'users'
      }
    },
    {
      $addFields: {
        creator: { $first: '$creators' }
      }
    },
    {
      $unset: ['creatorId', 'creators']
    },
    {
      $limit: 1
    }
  ])

  return quiz
}
