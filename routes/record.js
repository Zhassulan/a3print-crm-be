var express = require('express');
var router = express.Router();
var dbo = require('../db/conn');

router.get('/', function (req, res, next) {

    const dbConnect = dbo.getDb();
    dbConnect.collection("listingsAndReviews")
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
router.get('/', function (req, res, next) {

    const dbConnect = dbo.getDb();
    const matchDocument = {
        listing_id: req.body.id,
        last_modified: new Date(),
        session_id: req.body.session_id,
        direction: req.body.direction
    };

    dbConnect.collection("matches")
        .insertOne(matchDocument, function (err, result) {
            if (err) {
                res.status(400).send("Error inserting matches!");
            } else {
                console.log(`Added a new match with id ${result.insertedId}`);
                res.status(204).send();
            }
        });
});

module.exports = router;
