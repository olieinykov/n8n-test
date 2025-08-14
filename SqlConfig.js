import sql from 'mssql';

const config = {
    server: process.env.SQL_HOST,
    port: Number(process.env.SQL_PORT || 1433),
    database: process.env.SQL_DB,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    options: {
        encrypt: true,                // required for Azure SQL
        trustServerCertificate: false // required for Azure SQL
    },
    pool: { max: 10, min: 0, idleTimeoutMillis: 30000 }
};

let pool = null;

export async function getDb() {
    if (pool?.connected) return pool;
    pool = await sql.connect(config);
    return pool;
}