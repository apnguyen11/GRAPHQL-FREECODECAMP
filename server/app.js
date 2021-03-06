const express = require('express')
const graphqlHTTP = require('express-graphql')
const app = express()
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

//allow cross-origin requests
app.use(cors())

mongoose.connect("mongodb+srv://andy:123@gql-ninja-couvw.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true})
mongoose.connection.once('open', () => {
    console.log('connected to database')
})


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('now listening for requests on port 4000')
})