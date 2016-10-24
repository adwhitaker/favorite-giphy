var router = require('express').Router();
var pg = require('pg');

var config = {
  database: 'rho',
};

var pool = new pg.Pool(config);

router.route('/')
      .get(getFavorites);

router.route('/:id')
      .put(updateFavorites)
      .delete(deleteFavorites);

// get favorited gifs from the DB
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

// updates favorited gif in DB
function updateFavorites(req, res) {
  var id = req.params.id;
  var comment = req.body.comment;
  pool.connect(function (err, client, done) {
      try {
        if (err) {
          res.sendStatus(500);
          return;
        }

        client.query('UPDATE gifs SET comment = $1, edited = $2 WHERE id = $3;',
          [comment, true, id],
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

// deletes favorited gif from DB
function deleteFavorites(req, res) {
  var id = req.params.id;

  pool.connect(function (err, client, done) {
    try {
      if (err) {
        console.log('Error connecting to the DB', err);
        res.sendStatus(500);
        return;
      }

      client.query('DELETE FROM gifs WHERE id=$1;',
      [id],
      function (err, result) {
        if (err) {
          console.log('Error querying the database', err);
          res.SendStatus(500);
          return;
        }

        res.sendStatus(204);
      });
    } finally {
      done();
    }
  });
};

module.exports = router;
