const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // https://jwt.io/

const User = mongoose.model('User'); // give access to user model and data inside mongodb; manipulate the db data
const router = express.Router(); // obj that allows us to associate some # of route handles with it

router.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = new User({ email, password }); // creating new instance of user

        // save to db
        await user.save(); // async operation b/c making a call to mongoose db, must wait for response back

        const token = jwt.sign({ userId: user._id }, 'SecretKeyToken'); // create a jwt token; arg1 = info to put into token; arg2 = key to sign token
        res.send({ token }); // token must be included in any followup req; used to identify user
    } catch (err) {
        return res.status(422).send(err.message); // 422 = invalid data from user
    }
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ error: 'Must provide email and password' }); 
    }

    // find the user account
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
    try {
        await user.comparePassword(password);

        // generate jwt to authenticate for future requests
        const token = jwt.sign({ userId: user._id }, 'SecretKeyToken');

        res.send({ token });
    } catch (err) {
        return res.status(422).send({ error: 'Invalid password or email' });
    }
});

module.exports = router;