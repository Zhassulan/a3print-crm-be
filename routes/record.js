var express = require('express');
var router = express.Router();
var dbo = require('../db/conn');

router.get('/', function (req, res, next) {

    const dbConnect = dbo.getDb();
    dbConnect.collection('persons')
        .find({}).limit(50)
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
    if (dbConnect) {

    } else {
        res.status(500).send("Database error");
    }
    const person = {
        id: 1,
        name: 'Person',
        last_modified: new Date()
    };

    dbConnect.collection('persons')
        .insertOne(person, function (err, result) {
            if (err) {
                res.status(400).send("Error inserting matches!");
            } else {
                console.log(`Added a new match with id ${result.insertedId}`);
                res.status(204).send();
            }
        });
});

module.exports = router;
