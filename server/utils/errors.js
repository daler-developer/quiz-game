const { ApolloError } = require('apollo-server-express')

module.exports.ValidationError = class extends ApolloError {
  constructor() {
    super('ValidationError error')
  }
}

module.exports.NotAuthenticatedError = class extends ApolloError {
  constructor() {
    super('Not authenticated')
  }
}

module.exports.NotAuthenticatedError = class extends ApolloError {
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

module.exports.ForbiddenToDeleteQuizError = class extends ApolloError {
  constructor() {
    super('Forbidden to delete quiz')
  }
}

module.exports.QuizNotFoundError = class extends ApolloError {
  constructor() {
    super('Quiz was not found')
  }
}
