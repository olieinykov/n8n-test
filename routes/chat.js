var express = require('express');
const { getDb } = require("../SqlConfig");
var router = express.Router();

/* GET users listing. */
router.get('/entries', async function(req, res, next) {
  const db = await getDb();
  const response = await db.request().query(`
    SELECT 
      TABLE_NAME AS tableName,
      TABLE_SCHEMA AS schemaName
    FROM INFORMATION_SCHEMA.TABLES
    WHERE TABLE_TYPE = 'BASE TABLE'
  `);

  console.log("response ==>", response);

  res.status(200).json(response.recordset);
  // return res.sendStatus(200).json(response);
});

module.exports = router;
