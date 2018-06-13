const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLNonNull} = graphql;
const UserType = require('./types/User');
const RegisteredUserType = require('./types/RegisteredUser');
const {User, RegisteredUser} = require('../models');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        user: {
            type: UserType,
            args: {
                username: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValue, args) {
                return User.findOne({username: args.username})
            }
        },
        registeredUser: {
            type: RegisteredUserType,
            args: {
                email: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(parentValue, args) {
                return RegisteredUser.findOne({email: args.email})
            }
        }
    })
});

module.exports = RootQuery;