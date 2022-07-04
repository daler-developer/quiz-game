const { finished } = require('stream')
const { createWriteStream } = require('fs')
const path = require('path')
const { Types } = require('mongoose')
const QuizModel = require("../../../models/QuizModel")
const errors = require('../../../utils/errors')
const { generateQuizPreviewPath } = require('../../../utils/helpers')

module.exports = async (_, { name, questions, file }, ctx) => {
  const currentUser = ctx.user

  if (!currentUser) {
    throw new errors.NotAuthenticated()
  }

  const { filename, createReadStream } = await file

  const stream = createReadStream()

  const out = createWriteStream(path.join(__dirname, '..', '..', '..', 'uploads', filename))
  stream.pipe(out)
  // finished(out)

  const createdQuiz = await QuizModel.create({
    name,
    creatorId: currentUser._id, 
    questions,
    preview: generateQuizPreviewPath(filename)
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
