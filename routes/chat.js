var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/entries', function(req, res, next) {
  res.send('respond with a resource ENTRIES');
});

module.exports = router;
