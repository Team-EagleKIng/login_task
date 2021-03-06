const mongoose = require('mongoose');
const config = require('../Config/config');
mongoose.set('useCreateIndex', true);


mongoose.Promise = global.Promise
const connectionUrl = `mongodb+srv://${config.mongo.connection.host}:${config.mongo.connection.port}/${config.mongo.connection.db}` + '?retryWrites=true&w=majority'
console.log('Connecting to Mongo DB on ', connectionUrl);
mongoose.connect(connectionUrl, {useNewUrlParser: true})
    .then((data) => {
        console.log('MongoDB was connected sucessfully');
    }).catch((err) => {
        console.log('Unable to connect to mongoBD', err);
        process.exit();
});

module.exports = mongoose;

