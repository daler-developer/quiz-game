const jwt = require('jsonwebtoken')

module.exports.generateAuthToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '2 days' })
}

module.exports.decodeAuthToken = (token) => {
  return jwt.decode(token, process.env.JWT_SECRET)
}

module.exports.generateQuizPreviewPath = (name) => {
  return `/uploads/${name}`
}
