var express = require('express');
var router = express.Router();
var db = require('../queries');

router.get('/api/records', db.getAllRecords);
router.get('/api/records/:id', db.getSingleRecord);
router.post('/api/records', db.createRecord);
router.put('/api/records/:id', db.updateRecord);
router.delete('/api/records/:id', db.removeRecord);

// application -------------------------------------------------------------
router.get('/', function (req, res) {

    res.render('index', {title: 'node-postgres-promises'}); // load the single view file (angular will handle the page changes on the front-end)
});

module.exports = router;
