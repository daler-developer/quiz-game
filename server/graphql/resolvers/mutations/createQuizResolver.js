const { createWriteStream } = require('fs')
const path = require('path')
const Joi = require('joi')
const { Types } = require('mongoose')
const QuizModel = require("../../../models/QuizModel")
const errors = require('../../../utils/errors')
const { generateQuizPreviewPath } = require('../../../utils/helpers')

const schema = Joi.object({
  name: Joi.string().min(1).max(20),
  file: Joi.object().required(),
  questions: Joi.array().min(1).items(Joi.object({
    text: Joi.string().min(1).max(20),
    options: Joi.array().items(Joi.string().min(1).max(20)),
    correctOptionIndex: Joi.number().min(0)
  }))
})

module.exports = async (_, variables, ctx) => {
  const currentUser = ctx.user

  if (!currentUser) {
    throw new errors.NotAuthenticatedError()
  }

  const { error, value } = schema.validate(variables)

  if (error) {
    throw new errors.ValidationError()
  }

  const { file, name, questions } = value

  const { filename, createReadStream } = await file

  const stream = createReadStream()

  const out = createWriteStream(path.join(__dirname, '..', '..', '..', 'uploads', filename))
  stream.pipe(out)

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
