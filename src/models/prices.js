const fetch = require('node-fetch');

function getCurrent() {
  return new Promise((resolve, reject) => {
    fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then(res => res.json())
    .then(bpiIndex => {
      resolve(bpiIndex.bpi.USD.rate_float);
    })
    .catch(err => {
      reject('error finding current BPI');
    });
  });
}

function getYesterday() {
  return new Promise((resolve, reject) => {
    fetch(
      "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday"
    )
      .then(res => res.json())
      .then(yesterday => {
        resolve(yesterday.bpi["2018-03-08"]);
      })
      .catch(err => {
        reject('error finding yesterday\'s BPI');
      });
  });
}

module.exports = {
  getCurrent,
  getYesterday,
};