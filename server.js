var express = require('express');
var graphqlHTTP = require('express-graphql');
var { makeExecutableSchema } = require('graphql-tools');
var { api } = require('./src/nps-api');

// This uses the Apollo graphql-tools pattern.
var typeDefs = `
  type Query {
    parks (parkCode: String, stateCode: String): [Park]
  }

  type Park {
    description: String,
    name: String,
    fullName: String,
    id: ID,
    parkCode: String,
    designation: String,
    url: String,
    directionsUrl: String,
    directionsInfo: String,
    weatherInfo: String
  }
`;

class Park {
  constructor() {
  }
}

var resolvers = {
  Query: {
    parks: (obj, {parkCode, stateCode}) => api.parks(parkCode, stateCode)
  }
}

var schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
