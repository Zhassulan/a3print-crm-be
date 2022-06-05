const {MongoClient} = require('mongodb');
const CONN_STRING = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

const mongoose = require('mongoose');

async function run() {
    // await mongoClient.connect();
    await mongoose.connect(CONN_STRING + '/' + DB_NAME);
    // db = mongoClient.db(DB_NAME);
}

run().catch(console.dir);

module.exports = {
    getMongoose: function () {
        return mongoose;
    }
};
