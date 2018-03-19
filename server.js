var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var { api } = require('./src/nps-api');

var schema = buildSchema(`
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
`);

class Park {
  constructor() {
  }
}

var root = {
  parks: ({parkCode, stateCode}) => api.parks(parkCode, stateCode)
}

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
