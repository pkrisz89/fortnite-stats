const graphql = require('graphql');
const {GraphQLObjectType} = graphql;
const mongoose = require('mongoose');

//put here your mutations

const mutation = new GraphQLObjectType({name: 'Mutation', fields: {}});

module.exports = mutation;