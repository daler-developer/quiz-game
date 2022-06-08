const getUserResolver = require("./queries/getUserResolver")
const getUsersResolver = require("./queries/getUsersResolver")
const registerResolver = require('./mutations/registerResolver')
const loginResolver = require('./mutations/loginResolver')
const getMeResolver = require('./queries/getMeResolver')
const createQuizResolver = require("./mutations/createQuizResolver")
const getQuizesResolver = require("./queries/getQuizesResolver")
const getQuizResolver = require("./queries/getQuizResolver")
const deleteQuizResolver = require("./mutations/deleteQuizResolver")
const GraphQLUpload = require('graphql-upload/GraphQLUpload.js')
const likeQuizResolver = require("./mutations/likeQuizResolver")
const removeQuizLikeResolver = require("./mutations/removeQuizLikeResolver")
const incrementQuizNumTries = require("./mutations/incrementQuizNumTries")

module.exports = {
  Upload: GraphQLUpload,
  Query: {
    getUser: getUserResolver,
    getUsers: getUsersResolver,
    getMe: getMeResolver,
    getQuizes: getQuizesResolver,
    getQuiz: getQuizResolver
  },
  Mutation: {
    register: registerResolver,
    login: loginResolver,
    createQuiz: createQuizResolver,
    deleteQuiz: deleteQuizResolver,
    likeQuiz: likeQuizResolver,
    removeQuizLike: removeQuizLikeResolver,
    incrementQuizNumTries: incrementQuizNumTries,
  }
}
