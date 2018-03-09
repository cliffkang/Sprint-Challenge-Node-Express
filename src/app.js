const express = require('express');
const fetch = require('node-fetch');

const PORT = 3000;
const server = express();

const STATUS_SUCCESSFUL = 200;
const STATUS_USER_ERROR = 422;

server.get('/compare', (req, res) => {
  fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    .then(res => res.json())
    .then(bpiIndex => {
      fetch('https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday')
        .then(res => res.json())
        .then(yesterday => {
          console.log('bpiIndex is', bpiIndex);
          console.log('yesterday is', yesterday);
          const difference = bpiIndex.bpi.USD.rate_float - yesterday.bpi['2018-03-08'];
          res.status(STATUS_SUCCESSFUL);
          res.send({ difference: difference > 0 ? `The price of bitcoin is ${difference} higher than yesterday` : `The price of bitcoin is ${Math.abs(difference)} less than yesterday` });
        })
        .catch(err => {
          res.status(STATUS_USER_ERROR);
          res.send({ error: err });
        });
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send({ error: err });
    });
})

server.listen(PORT, (err) => {
  if (err) console.error(err);
  else console.log(`Server is listening on port ${PORT}`);
});