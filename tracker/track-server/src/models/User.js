const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// inform mongoose the different properties a user has
// define data structure
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// pre-save hook, runs before saving an instance to db
userSchema.pre('save', function(next) { // use 'function()' to use 'this' call to get info to user info; '() =>' would get the whole file info
    const user = this;

    if (!user.isModified('password')) { // if pw not modified, run next();
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => { // arg1 = how complex to make the salt
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            };

            user.password = hash; // update user pw with hashed pw

            next();
        });
    });
});

// check password auth; creating function/method to be called to compare pw
userSchema.methods.comparePassword = function(candidatePassword) {
    // const user = this;

    return new Promise((resolve, reject) => { // must always pass a callback() when creating a promise
        bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }

            if (!isMatch) {
                return reject(false);
            }

            resolve(true);
        });
    });
};

// associate data structure to Mongoose library
mongoose.model('User', userSchema); // expecting this is only used once
// passing 'User' as a class(?)