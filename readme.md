# National Park Service API GraphQL Server

## About

This is a node.js GraphQL server that connects to the National Park Service API.

## Quick Start

Install node.js

```
# Install node modules
npm install

# Create config file
cp example.config.yml config.yml

# Modify your config.yml file with an API key from https://www.nps.gov/subjects/developer/get-started.htm

# Run the server
npm start
```

## Explore the API with GraphiQL

Go to [http://localhost:4000/graphql](http://localhost:4000/graphql)


## Sample GraphQL query

```
query {
  parks (parkCode: "arch") {
    fullName,
    description
  }
}
```

## Architecture

### Express

Express.js is a Node.js webserver used to the GraphQL data through HTTP.

express-graphql adds support for GraphQL to express.

### GraphQL Tools

Apollo GraphQL Tools provide an easy way to build a schema in a modular manner. This includes using the type definition and resolver pattern. This also allows combining multiple components into a single schema.

### Node YAML

YAML is a simple data format and is used for application configuration here. This extension provides support for reading and writing YAML files.

### Fetch

A Node.js extention which allows the use of the window.fetch API now included with most modern browsers. This API allows fetching resources such as JSON data.

This is used to get data from the National Park Service API.

## References

### NPS API Guide
[https://www.nps.gov/subjects/developer/guides.htm](https://www.nps.gov/subjects/developer/guides.htm)

### GraphQL Tutorial

#### A General Tutorial
[http://graphql.org/graphql-js/](https://www.nps.gov/subjects/developer/guides.htm)

#### A Guide on using graphql-tools
[https://www.apollographql.com/docs/graphql-tools/](https://www.apollographql.com/docs/graphql-tools/)
