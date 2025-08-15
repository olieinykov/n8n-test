var express = require('express');
const { getDb } = require("../SqlConfig");
var router = express.Router();
var sql = require('mssql');

/* GET users listing. */
router.get('/entries', async function(req, res, next) {
  const { page = 1, pageSize = 100 } = req.query;
  const offset = (page - 1) * pageSize;

  try {
    const db = await getDb();
    const result = await db.request()
        .input('offset', sql.Int, offset)
        .input('pageSize', sql.Int, pageSize)
        .query(`
        SELECT * FROM ChannelEntries
        ORDER BY Id
        OFFSET @offset ROWS
        FETCH NEXT @pageSize ROWS ONLY
      `);

    const countResult = await db.request()
        .query('SELECT COUNT(*) AS total FROM ChannelEntries');

    res.status(200).json({
      success: true,
      data: result.recordset,
      pagination: {
        page: Number(page),
        pageSize: Number(pageSize),
        total: countResult.recordset[0].total
      }
    });
  } catch (error) {
    console.error('SQL Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ChannelEntries',
      error: error.message
    });
  }
});

module.exports = router;
