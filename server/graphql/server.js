const { ApolloServer } = require("apollo-server-express")
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const { decodeAuthToken } = require("../utils/helpers")
const UserModel = require("../models/UserModel")

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  async context({ req }) {
    const ctx = {}

    const authorization = req.headers.authorization

    if (authorization) {
      const token = authorization.split(' ')[1]
  
      const decoded = decodeAuthToken(token)
  
      const user = await UserModel.findById(decoded.userId)
  
      if (user) {
        ctx.user = user
      }
    }

    return ctx
  },
  formatError(err) {
    return err
  },
  csrfPrevention: false,
})
