const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, { versionKey: false })

userSchema.statics.findByUsername = function(username) {
  return this.findOne({ username })
}

module.exports = model('User', userSchema)
