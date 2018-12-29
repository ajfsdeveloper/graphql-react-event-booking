const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const mongoose = require('mongoose')

const graphQlSchema = require('./graphql/schema')
const graphQlResolvers = require('./graphql/resolvers')

const app = express()

const events = []

app.use(bodyParser.json())

app.use('/graphql', graphqlHttp({
  schema: graphQlSchema,
  rootValue: graphQlResolvers,
  graphiql: true
}))

mongoose.connect(`
mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@graphql-react-event-booking-ogtee.mongodb.net/${process.env.MONGO_DB}?retryWrites=true
`).then(() => {
  app.listen(3000)
}).catch(err => {
  console.log(err)
})