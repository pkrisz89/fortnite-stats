const graphql = require("graphql");
const {GraphQLObjectType, GraphQLString, GraphQLNonNull} = graphql;

const RegisteredUserType = new GraphQLObjectType({
    name: 'RegisteredUser',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        registered_on: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});

module.exports = RegisteredUserType;