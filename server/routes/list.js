var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/do_to_list';

router.post('/', function (req, res) {
  var list = req.body;
  console.log('line 8 in server list', req.body);

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    client.query('INSERT INTO list (to_do_list, status) '
      + 'VALUES ($1, $2)',
      [list.to_do_list, list.status],
      function (err, result) {
        done();

        if (err) {
          console.log('error line 39 server', err);
          res.sendStatus(500);
        } else {
          res.sendStatus(201);
        }
      }); 
    });
});



router.get('/', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }
    client.query('SELECT * FROM list', function (err, result) {
      done();

      if (err) {
        res.sendStatus(500);
      }
      res.send(result.rows);
      console.log(result.rows);
    });
  });
});

router.get('/:status', function (req, res) {
  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    console.log('line 56 req.para', req.params.status);
    client.query('SELECT * FROM list WHERE status = \' $2 \'', function (err, result) {
      done();

      console.log('error line 60');
      console.log(err);
      if (err) {
        res.sendStatus(500);
      }
      console.log(result);
      res.send(result.rows);
    });
  });
});


router.put('/:id', function (req, res) {
  var id = req.params.id;
  var list = req.body;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('UPDATE list ' +
                  'SET to_do_list = $1, ' +
                  'status = $2 ' +
                  'WHERE id = $3',
                [list.to_do_list, list.status, id],
              function (err, result) {
                done();

                if (err) {
                  console.log('err line 92', err);
                  res.sendStatus(500);
                } else {
                  res.sendStatus(200);
                }
              });
  });
});


router.delete('/:id', function (req, res) {
  var id = req.params.id;

  pg.connect(connectionString, function (err, client, done) {
    if (err) {
      res.sendStatus(500);
    }

    client.query('DELETE FROM list ' +
                  'WHERE id = $1',
                  [id],
                  function (err, result) {
                    done();

                    if (err) {
                      res.sendStatus(500);
                      return;
                    }

                    res.sendStatus(200);
                  });
  });
});


module.exports = router;







