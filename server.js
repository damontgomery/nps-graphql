var express = require('express');
var graphqlHTTP = require('express-graphql');
var { makeExecutableSchema } = require('graphql-tools');
var { api } = require('./src/nps-api');

// This uses the Apollo graphql-tools pattern.
var typeDefs = `
  type Park {
    description: String
    name: String
    fullName: String
    id: ID
    parkCode: String
    designation: String
    url: String
    directionsUrl: String
    directionsInfo: String
    weatherInfo: String
    images: [Image]
  }

  type VisitorCenter {
    directionsInfo: String
    name: String
    url: String
    id: ID
    directionsUrl: String
    description: String
    park: Park
  }

  type Image {
    credit: String
    altText: String
    title: String
    id: ID
    caption: String
    url: String
  }

  enum State {
    AL
    AK
    AZ
    AR
    CA
    CO
    CT
    DE
    FL
    GA
    HI
    ID
    IL
    IN
    IA
    KS
    KY
    LA
    ME
    MD
    MA
    MI
    MN
    MS
    MO
    MT
    NE
    NV
    NH
    NJ
    NM
    NY
    NC
    ND
    OH
    OK
    OR
    PA
    RI
    SC
    SD
    TN
    TX
    UT
    VT
    VA
    WA
    WV
    WI
    WY
    AS
    DC
    FM
    GU
    MH
    MP
    PW
    PR
    VI
    AE
    AA
    AP
  }

  type Query {
    parks (parkCode: String, stateCode: State): [Park],
    visitorCenters (parkCode: String, stateCode: State): [VisitorCenter],
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
