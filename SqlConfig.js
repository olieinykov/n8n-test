import sql from 'mssql';

const config = {
    server: process.env.DB_HOST,
    port: Number(process.env.SQL_PORT || 1433),
    database: process.env.SQL_DB,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true,                // required for Azure SQL
        trustServerCertificate: false // required for Azure SQL
    },
    pool: { max: 10, min: 0, idleTimeoutMillis: 30000 }
};

let pool = null;

export async function getDb() {
    console.log("<<<< Start DEBUG DB CONNECTION >>>>");
    console.log("DB_HOST", process.env.DB_HOST);
    console.log("DB_USER", process.env.DB_USER);
    console.log("DB_PASSWORD", process.env.DB_PASSWORD);
    console.log("<<<< End DEBUG DB CONNECTION >>>>");


    if (pool?.connected) return pool;
    pool = await sql.connect(config);
    return pool;
}