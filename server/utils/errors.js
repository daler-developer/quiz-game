const { ApolloError } = require('apollo-server-express')

module.exports.NotAuthenticated = class extends ApolloError {
  constructor() {
    super('Not authenticated')
  }
}

module.exports.UserAlreadyExists = class extends ApolloError {
  constructor() {
    super('User already exists')
  }
}

module.exports.UserNotFound = class extends ApolloError {
  constructor() {
    super('User was not found')
  }
}

module.exports.IncorrectPassword = class extends ApolloError {
  constructor() {
    super('Incorrect password')
  }
}

module.exports.QuizNotFound = class extends ApolloError {
  constructor() {
    super('Quiz was not found')
  }
}
