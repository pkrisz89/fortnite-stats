const graphql = require('graphql');
const {GraphQLObjectType, GraphQLString, GraphQLError, GraphQLNonNull} = graphql;
const RegisterUser = require('./types/RegisterUser');
const {User, RegisteredUser} = require('../models');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        registerUser: {
            type: RegisterUser,
            args: {
                email: {
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
                                RegisteredUser.confirmUser(user, email, password)

                                return user
                            })
                    })

            }
        }
    }
});

module.exports = mutation;