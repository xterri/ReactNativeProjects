require('./models/User'); // assumed only use this once, don't need to associate with a variable
require('./models/Track'); // call in parent so it's only created/called to create it once

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // parse info on body property of incoming request; handle incoming json information

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json()); // order matters, get info first then run the route

app.use(authRoutes); // ^ info from bodyparser, passed as 'req' in authRoutes
app.use(trackRoutes);


// cloud.mongodb.com => free hosted MongoDB instance
const mongoUri = 'mongodb+srv://admin:p@$$w0rd@cluster0-sze04.gcp.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

// check if connected to mongoose instance
mongoose.connection.on('connected', () => {
    console.log('connected to mongo instance');
});

// error in connecting to instance
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err);
});

// pass middleware to any req handlers
app.get('/', requireAuth, (req, res) => { // when user tries to access our site, req valid jwt before allowing access
    // only allow access if user has valid token

    res.send(`Your email: ${req.user.email}`); // when req made to our route, returns this
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});