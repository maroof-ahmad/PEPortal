var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("you have landed on the wrong page");
});

module.exports = router;
