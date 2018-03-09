const express = require("express");
const fetch = require("node-fetch");
const pricesController = require('./controllers/prices.js');

const PORT = 3000;
const server = express();

server.use(pricesController);

server.listen(PORT, err => {
  if (err) console.error(err);
  else console.log(`Server is listening on port ${PORT}`);
});

// server.get("/compare", (req, res) => {
//   fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
//     .then(res => res.json())
//     .then(bpiIndex => {
//       fetch(
//         "https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday"
//       )
//         .then(res => res.json())
//         .then(yesterday => {
//           const difference =
//             bpiIndex.bpi.USD.rate_float - yesterday.bpi["2018-03-08"];
//           res.status(STATUS_SUCCESSFUL);
//           res.send({
//             difference:
//               difference > 0
//                 ? `The price of bitcoin is ${Number(
//                     difference.toFixed(2)
//                   )} higher than yesterday`
//                 : `The price of bitcoin is ${Number(
//                     Math.abs(difference).toFixed(2)
//                   )} less than yesterday`
//           });
//         })
//         .catch(err => {
//           res.status(STATUS_USER_ERROR);
//           res.send({ error: err });
//         });
//     })
//     .catch(err => {
//       res.status(STATUS_USER_ERROR);
//       res.send({ error: err });
//     });
// });