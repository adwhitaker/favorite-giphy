var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rho',
};

var pool = new pg.Pool(config);

router.route('/')
      .post(postFavorites);

function postFavorites(req, res) {
  pool.connect(function (err, client, done) {
    console.log('req: ', req.body);
    try {
      if (err) {
        res.sendStatus(500);
        return;
      }

      client.query('INSERT INTO gifs (url, comment, edited) VALUES ($1, $2, $3) RETURNING *;',
        [req.body.url, req.body.comment, false],
        function (err, result) {
          if (err) {
            console.log('Issue querying the DB', err);
            res.sendStatus(500);
            return;
          }

          res.sendStatus(200);
        });
    } finally {
      done();
    }
  });
};

module.exports = router;
