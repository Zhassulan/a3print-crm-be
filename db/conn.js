const {MongoClient} = require('mongodb');
const CONN_STRING = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

const mongoClient = new MongoClient(CONN_STRING);
let db;

async function run() {
    await mongoClient.connect();
    db = mongoClient.db(DB_NAME);
}

run().catch(console.dir);

module.exports = {
    getDb: function () {
        return db;
    }
};
