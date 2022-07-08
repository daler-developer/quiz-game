const { Types } = require('mongoose')
const QuizModel = require("../../../models/QuizModel")
const errors = require('../../../utils/errors')

module.exports = async (parent, { page, search }, ctx) => {
  const currentUser = ctx.user

  const itemsPerPage = 8
  
  const $match = {}

  if (search) {
    $match.name = { $regex: new RegExp(search, 'i') }
  }

  const quizes = await QuizModel.aggregate([
    {
      $match
    },
    {
      $lookup: {
        as: 'creators', localField: 'creatorId', foreignField: '_id', from: 'users'
      }
    },
    {
      $addFields: {
        creator: { $first: '$creators' },
        isLikedByCurrentUser: { $in: [currentUser._id, '$likes'] },
        isCreatedByCurrentUser: { $eq: [currentUser._id, '$creatorId'] }
      }
    },
    {
      $unset: ['creatorId', 'creators']
    },
    {
      $skip: (page - 1) * itemsPerPage
    },
    {
      $limit: itemsPerPage
    }
  ])

  const numDocuments = await QuizModel.countDocuments()

  const numPages = Math.floor(numDocuments / itemsPerPage) + (numDocuments % itemsPerPage !== 0 ? 1 : 0)

  return {
    numPages,
    quizes
  }
}
