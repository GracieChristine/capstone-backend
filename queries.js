const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};

const pgp = require('pg-promise')(options);
const connectionString = 'postgres://localhost:5432/capstonedb';
const db = pgp(connectionString);

function getAllRecords(req, res, next) {
  db.any('select * from records')
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL records'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

function getSingleRecord(req, res, next) {
  const recordID = parseInt(req.params.id);
  db.one('select * from records where id = $1', recordID)
    .then((data) => {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE record'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

function createRecord(req, res, next) {
  req.body.age = parseInt(req.body.age);
  db.none('insert into records(original, original_lang, translated, translated_lang)' +
      'values(${original}, ${original_lang}, ${translated}, ${translated_lang})',
    req.body)
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one record'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

function updateRecord(req, res, next) {
  db.none('update records set original=$1, original_lang=$2, translated=$3, translated_lang=$4 where id=$5',
    [req.body.original, req.body.original_lang, req.body.translated, req.body.translated_lang, parseInt(req.params.id)])
    .then(() => {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated record'
        });
    })
    .catch((err) => {
      return next(err);
    });
}

function removeRecord(req, res, next) {
  const recordID = parseInt(req.params.id);
  db.result('delete from records where id = $1', recordID)
    .then((result) => {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} record`
        });
      /* jshint ignore:end */
    })
    .catch((err) => {
      return next(err);
    });
}

module.exports = {
  getAllRecords: getAllRecords,
  getSingleRecord: getSingleRecord,
  createRecord: createRecord,
  updateRecord: updateRecord,
  removeRecord: removeRecord
};
