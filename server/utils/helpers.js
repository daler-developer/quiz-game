const jwt = require('jsonwebtoken')

module.exports.generateAuthToken = (userId) => {
  return jwt.sign({ userId }, 'jwt-secret', { expiresIn: '2 days' })
}

module.exports.decodeAuthToken = (token) => {
  return jwt.decode(token, 'jwt-secret')
}
