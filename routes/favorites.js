var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rho',
};

var pool = new pg.Pool(config);

router.route('/')
      .get(getFavorites);

function getFavorites(req, res) {
  pool.connect(function (err, client, done) {
    try {
      if (err) {
        res.sendStatus(500);
        return;
      }

      client.query('SELECT * FROM gifs ORDER BY id;',
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
