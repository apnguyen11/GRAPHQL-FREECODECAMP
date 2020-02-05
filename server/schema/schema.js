const graphql = require('graphql')
const _=require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

//dummy data
var books = [
    {name: 'Gone with the wind', genre: 'Fantasy', id: '1'},
    {name: 'Gone Fishing', genre: 'Sci-Fantasy', id: '2'},
    {name: 'Farmin huntin', genre: 'Science', id: '3'}
]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLString},
        name: { type: GraphQLString},
        genre: { type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id:{type: GraphQLString}},
            resolve(parent, args){
              return _.find(books, { id: args.id})
                //code to get data from db/other source
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})

