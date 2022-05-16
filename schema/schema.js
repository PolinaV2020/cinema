const graphql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const movies = [
  { id: "1", name: "MONTANA STORY", genre: "Drama", directorId: "1" },
  { id: "2", name: "ON THE COUNT OF THREE", genre: "Comedy", directorId: "2" },
  { id: "3", name: "THE INNOCENTS", genre: "Mystery", directorId: "3" },
  { id: "4", name: "HOLD YOUR FIRE", genre: "Documentary", directorId: "4" },
  { id: "5", name: "Birds Past", genre: "Documentary", directorId: "1" },
  {
    id: "6",
    name: "Diddy Runs the City ",
    genre: "Documental",
    directorId: "4"
  },
  {
    id: "7",
    name: " Boogie Man: The Lee Atwater Story ",
    genre: "Documentary",
    directorId: "4"
  }
];

const directors = [
  { id: "1", name: "Scott McGehee", age: 38 },
  { id: "2", name: "Jerrod Carmichael", age: 29 },
  { id: "3", name: "Eskil Vogt", age: 36 },
  { id: "4", name: "Stefan Forbes", age: 32 }
];

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find((director) => director.id === parent.directorId);
      }
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies.filter((movie) => movie.directorId === parent.id);
      }
    }
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
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directors.find((director) => director.id == args.id);
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      }
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        return directors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query
});
