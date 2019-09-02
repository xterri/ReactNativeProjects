// take incoming req and preprocess on it
// check user auth, must get token from user for access
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = mongoose.model('User'); // get access to user model

module.exports = (req, res, next) => { // if user has jwt call 'next' function
    // req = looks for header called 'authorization'; if provided, extract jwt from it
    const { authorization } = req.headers; // express auto lowercases strings
    // authorization === 'Bearer <jwt>'

    if (!authorization) { // not a valid req
        return res.status(401).send({ error: 'You must be logged in' });
    } 

    const token = authorization.replace('Bearer ', ''); // extract just jwt

    // verifcation; arg1 = token; arg2 = signed key; arg3 = callback function after verifcation
    jwt.verify(token, 'SecretKeyToken', async (err, payload) => { // all ok = returns payload (info in jwt)
        if (err) {
            return res.status(401).send({ error: 'Please log in' });
        }

        const { userId } = payload; // extract info from payload

        const user = await User.findById(userId); // look up user in db and assign to 'req' object
        req.user = user; // assign user info to user property in req object

        next();
    }); 
};