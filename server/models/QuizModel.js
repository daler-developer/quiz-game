const { Schema, model } = require('mongoose')

const quizSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  preview: {
    type: String,
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: {
    type: [{
      text: { type: String, required: true },
      options: {
        type: [{
          text: { type: String, required: true },
          isCorrect: { type: Boolean, required: true }
        }],
        required: true
      }
    }],
    required: true
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: () => []
  },
  numTries: {
    type: Number,
    default: () => 0
  }
}, { versionKey: false, collection: 'quizes' })

module.exports = model('Quiz', quizSchema)
