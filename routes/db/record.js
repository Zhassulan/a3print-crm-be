var express = require('express');
var router = express.Router();
var dbo = require('../../db/conn');

const kittySchema = new mongoose.Schema({
    name: String
  });
  
router.get('/', function (req, res, next) {

    const mongoose = dbo.getMongoose();
    mongoose.collection('persons')
        .find({})
        .limit(50)
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching listings!");
            } else {
                res.json(result);
            }
        });
});

// This section will help you create a new document.
router.post('/', function (req, res, next) {

    const dbConnect = dbo.getDb();

    if (!dbConnect) {
        res.status(500).send("Database error");
        return;
    }

    const person = {
        name: 'Person',
        last_modified: new Date()
    };

    dbConnect.collection('persons')
        .insertOne(person, function (err, result) {
            if (err) {
                res.status(400).send("Error inserting!");
            } else {
                console.log(`Added a new with id ${result._id}`);
                res.status(204).send();
            }
        });
});

module.exports = router;
