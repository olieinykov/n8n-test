var express = require('express');
const { getDb } = require("../SqlConfig");
var router = express.Router();

/* GET users listing. */
router.get('/entries', async function(req, res, next) {
  const db = await getDb();
  const response = await db.request().query('SELECT 1 AS ok');
  console.log("entries response", response);
  // return response.recordset[0].ok === 1;
  return res.sendStatus(200).json(response);
});

module.exports = router;
