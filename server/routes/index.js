/**
 * Created by samuelmoss on 11/10/15.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

var pg = require('pg');

var connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/natalie_dummy_db";

router.get('/submit', function(req,res){
    var results = [];

    pg.connect(connectionString, function (err, client) {
        var query = client.query("SELECT id FROM sympathymessages ORDER BY id DESC");

        // Stream results back one row at a time, push into results array
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});


router.post('/submit', function(req, res){

    var addedMessage = {
        "name": req.body.name,
        "message": req.body.message,
        "email": req.body.email,
        "otherContact": req.body.otherContact
    };

    pg.connect(connectionString, function(err, client){
        client.query("INSERT INTO sympathymessages (name, message, email, otherContact) VALUES ($1, $2, $3, $4)",
            [addedMessage.name, addedMessage.message, addedMessage.email, addedMessage.otherContact],
            function (err, result) {
                if (err) console.log(err);
                res.send(addedMessage);
            });
    });

});

router.delete('/submit', function(req, res){

    pg.connect(connectionString, function (err, client) {
        client.query("DELETE FROM sympathymessages WHERE id = ($1)", [req.query.id], function(err, result){
            if (err) {
                console.log("Error deleting data! ", err);
                res.send(false);
            }

            res.send(true);
        });
    });
});

router.get('/*', function(req, res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;