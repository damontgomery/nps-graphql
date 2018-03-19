var express = require('express');
var graphqlHTTP = require('express-graphql');
var { makeExecutableSchema } = require('graphql-tools');
var { api } = require('./src/nps-api');

// This uses the Apollo graphql-tools pattern.
var typeDefs = `
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

  type VisitorCenter {
    directionsInfo: String,
    name: String,
    url: String,
    id: ID,
    directionsUrl: String,
    description: String,
    park: Park
  }

  type Query {
    parks (parkCode: String, stateCode: String): [Park],
    visitorCenters (parkCode: String, stateCode: String): [VisitorCenter],
  }
`;

class Park {
  constructor() {
  }
}

class VisitorCenter {}

var resolvers = {
  Query: {
    parks: (obj, {parkCode, stateCode}) => api.parks(parkCode, stateCode),
    visitorCenters: (obj, {parkCode, stateCode}) => api.visitorCenters(parkCode, stateCode),
  },
  VisitorCenter: {
    park: (visitorCenter) => api.park(visitorCenter.parkCode)
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
