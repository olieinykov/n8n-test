var express = require('express');
const { getDb } = require("../SqlConfig");
var router = express.Router();

/* GET users listing. */
router.get('/entries', async function(req, res, next) {
  const db = await getDb();
  const response = await db.request().query(`
    SELECT 
      t.name AS tableName,
      s.name AS schemaName,
      CASE WHEN t.is_ms_shipped = 1 THEN 'System' ELSE 'User' END AS tableType
    FROM sys.tables t
    INNER JOIN sys.schemas s ON t.schema_id = s.schema_id
    ORDER BY t.is_ms_shipped, s.name, t.name
  `);

  console.log("response ==>", response);

  res.status(200).json(response.recordset);
  // return res.sendStatus(200).json(response);
});

module.exports = router;
