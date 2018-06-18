const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLError} = graphql;
const RegisterUser = require('./types/RegisterUser');
const {User, RegisteredUser} = require('../models');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: {
            type: RegisterUser,
            args: {
                email: {
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
            },
            resolve(parentValue, {email, password, username, platform}) {
                const newUser = new User({username, platform});

                return User
                    .doesUserExist(username)
                    .then(user => {

                        if ((user && user.registered)) {
                            return new GraphQLError('user already exists')
                        }

                        return newUser
                            .save()
                            .then(user => {
                                return RegisteredUser.confirmUser(user, email, password)
                                //does not return anything in graphql
                            })
                    })

            }
        }
    }
});

module.exports = mutation;