const QuizModel = require('../../../models/QuizModel')
const { Types } = require('mongoose')
const errors = require('../../../utils/errors')

module.exports = async (parent, { _id }, ctx) => {
  _id = new Types.ObjectId(_id)

  const [quiz] = await QuizModel.aggregate([
    {
      $match: { _id }
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

  if (!quiz) {
    throw new errors.QuizNotFound()
  }

  return quiz
}

