const graphql = require("graphql");
const {GraphQLObjectType, GraphQLString} = graphql;

const RegisterUserType = new GraphQLObjectType({
    name: 'RegisterUser',
    fields: () => ({
        id: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        registered_on: {
            type: GraphQLString
        },
        username: {
            type: GraphQLString
        },
        platform: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    })
});

module.exports = RegisterUserType;