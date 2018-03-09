const express = require("express");
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const { getCurrent, getYesterday } = require("../models/prices.js");

router.get("/compare", (req, res) => {
  getCurrent()
    .then(bpiIndex => {
      getYesterday()
        .then(yesterday => {
          const difference = bpiIndex - yesterday;
          res.status(STATUS_SUCCESS);
          res.send({
            difference:
              difference > 0
                ? `The price of bitcoin is ${Number(
                    difference.toFixed(2)
                  )} higher than yesterday`
                : `The price of bitcoin is ${Number(
                    Math.abs(difference).toFixed(2)
                  )} less than yesterday`
          });
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
});

module.exports = router;
