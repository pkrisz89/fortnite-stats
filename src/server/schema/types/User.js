const graphql = require("graphql");
const {GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList} = graphql;

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        username: {
            type: new GraphQLNonNull(GraphQLString)
        },
        platform: {
            type: new GraphQLNonNull(GraphQLString)
        },
        created_on: {
            type: new GraphQLNonNull(GraphQLString)
        },
        registered: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
        friends: {
            type: new GraphQLList(GraphQLString)
        }
    })
});

module.exports = UserType;