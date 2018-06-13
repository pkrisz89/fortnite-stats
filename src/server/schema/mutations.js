const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString} = graphql;
const RegisterUser = require('./types/RegisterUser');
const {User} = require('../models');

const mutation = new GraphQLObjectType({
    name: 'Mutation', 
    fields: {
        registerUser: {
            type: RegisterUser,
            args: {
                email: { type: GraphQLString},
                username: { type: GraphQLString},
                platform: { type: GraphQLString},
                password: { type: GraphQLString}
            },
            resolve(parentValue, { email, password, username, platform }){
                const newUser = new User({ username, platform });
     
                User.doesUserExist(username).then(user => {
                   if ((user && user.registered)){
                       return "User already registered"
                   }

                })

            }
        }
}});

module.exports = mutation;