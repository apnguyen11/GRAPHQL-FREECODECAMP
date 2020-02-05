const graphql = require('graphql')
const _=require('lodash')

const { GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList
     } = graphql;

//dummy data
var books = [
    {name: 'Gone with the wind', genre: 'Fantasy', id: '1', authorId:'1'},
    {name: 'Gone Fishing', genre: 'Sci-Fantasy', id: '2', authorId: '2'},
    {name: 'Farmin huntin', genre: 'Science', id: '3', authorId: '3'},
    {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorId: '2'},
    {name: 'The Color of Magic', genre: 'Science', id: '5', authorId: '3'},
    {name: 'The Light Fantastic', genre: 'Science', id: '6', authorId: '3'}
]

var authors = [
    {name: 'Patrick Biffle', age: 44, id: '1'},
    {name: 'Johnny Sanchez', age: 42, id: '2'},
    {name: 'Jimmy John', age: 23, id: '3'}
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        genre: { type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                console.log(parent);
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID},
        name: { type: GraphQLString},
        age: { type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return _.filter(books, {authorId: parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){

                console.log(typeof(args.id))
              return _.find(books, { id: args.id})
                //code to get data from db/other source
            }
        },
        author: {
            type: AuthorType,
            args: {id:{type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, { id: args.id});
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery
})

