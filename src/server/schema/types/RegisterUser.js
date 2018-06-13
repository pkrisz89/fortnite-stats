const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = graphql;

const RegisterUserType = new GraphQLObjectType({
    name: 'RegisterUser',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        email: {
            type: new GraphQLNonNull(GraphQLString)
        },
        registered_on: {
            type: new GraphQLNonNull(GraphQLString)
        },
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        platform: {
            type: new GraphQLNonNull(GraphQLString)
        },
        password: {
            type: new GraphQLNonNull(GraphQLString)
        }
    })
});

module.exports = RegisterUserType;