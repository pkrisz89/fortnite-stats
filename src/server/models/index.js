const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const {Schema} = mongoose;

Promise.promisifyAll(mongoose);

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    platform: {
        type: String,
        required: true
    },
    created_on: {
        type: Date,
        default: Date.now()
    },
    registered: {
        type: Boolean,
        default: false
    },
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

UserSchema.statics.doesUserExist = function (username) {
    const query = {
        username
    };
    return User.findOne(query);
}

const RegisteredUserSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    registered_on: {
        type: Date,
        default: Date.now()
    }
});

RegisteredUserSchema.statics.confirmUser = (user, email, password) => {
    return bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            const newRegisteredUser = new RegisteredUser({id: user._id, email, password: hash});
            return newRegisteredUser
                .save()
                .then(() => {
                    user.registered = true;
                    return user.save()
                })
        });
    });
};

const User = mongoose.model('User', UserSchema);
const RegisteredUser = mongoose.model('RegisteredUser', RegisteredUserSchema);

module.exports = {
    User,
    RegisteredUser
};