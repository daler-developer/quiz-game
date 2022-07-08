const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env.local') })
const http = require('http')
const express = require('express')
const { connect } = require('mongoose')
const apolloServer = require('./graphql/server')
const graphqlUploadExpress = require('graphql-upload/graphqlUploadExpress.js')

const start = async () => {
  const app = express()

  const httpServer = http.createServer(app)


  await apolloServer.start()
  
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
  app.use(graphqlUploadExpress())
  app.use(apolloServer.getMiddleware())

  await connect(process.env.MONGO_URL)

  httpServer.listen({ port: 4000 })
  console.log('listening')
}

start()
