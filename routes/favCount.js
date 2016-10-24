var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rho',
};

var pool = new pg.Pool(config);

router.route('/')
      .get(getCount);

// route to get count from DB
function getCount(req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        res.sendStatus(500);
        return;
      }

      client.query('SELECT count(*) FROM gifs;',
            function (err, result) {
              if (err) {
                console.log('Issue querying the DB', err);
                res.sendStatus(500);
                return;
              }

              res.send(result.rows);
            });
    } finally {
      done();
    }
  });
};

module.exports = router;
