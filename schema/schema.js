const graphql = require("graphql");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const movies = [
  { id: 1, name: "MONTANA STORY", genre: "Drama" },
  { id: 2, name: "ON THE COUNT OF THREE", genre: "Comedy" },
  { id: "3", name: "THE INNOCENTS", genre: "Mystery" },
  { id: "4", name: "HOLD YOUR FIRE", genre: "Documental" }
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find((movie) => movie.id == args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query
});
