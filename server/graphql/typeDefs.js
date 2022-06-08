const { gql } = require('apollo-server-express')

module.exports = gql`

  scalar Upload

  input OptionInput {
    text: String!
    isCorrect: Boolean!
  }

  input QuestionInput {
    text: String!
    options: [OptionInput!]!
  }

  type User {
    _id: String!
    username: String!
  }

  type UserWithToken {
    user: User!
    token: String!
  }

  type QuestionOption {
    text: String!
    isCorrect: Boolean!
  }

  type Question {
    text: String!
    options: [QuestionOption!]!
  }

  type Quiz {
    _id: String!
    preview: String!
    name: String!
    creator: User!
    questions: [Question!]!
    numTries: Int!
    isLikedByCurrentUser: Boolean!
  }

  type QuizWithNumPages {
    quizes: [Quiz!]!
    numPages: String!
  }

  type Query {
    getMe: User!
    getUser(_id: String!): User!
    getUsers: [User!]!
    getQuizes(page: Int = 1): QuizWithNumPages!
    getQuiz(_id: String!): Quiz!
  }

  type Mutation {
    register(username: String!, password: String!): UserWithToken!
    login(username: String!, password: String!): UserWithToken!
    createQuiz(name: String!, questions: [QuestionInput!]! file: Upload): Quiz! 
    deleteQuiz(quizId: String!): String!
    likeQuiz(quizId: String!): String!
    removeQuizLike(quizId: String!): String
    incrementQuizNumTries(quizId: String!): Int
  }

`
