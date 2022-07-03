const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;
const mongoose = require('mongoose');

async function run() {
    await mongoose.connect(DB_URI + '/' + DB_NAME);
}

run().catch(console.dir);

module.exports = {
    getMongoose: function () {
        return mongoose;
    }
};
