/**
 * Take pool, query and values return the data
 * @param pool
 * @param query
 * @param values
 * @returns
 */

const getData = async (pool, query, values) => {
  try {
    const [rows, field] = await pool.query(query, values);
    return rows;
  } catch (err) {
    console.log(err.message);
  }
};

const executeQuery = async (pool, query, values) => {
  try {
    const [rows, field] = await pool.query(query, values);
    return rows.affectedRows > 0;
  } catch (err) {
    console.log(err.message);
  }
};


const dbConnectionChecker = async (pool) => {
  try {
    const conn = await pool.getConnection();
    const [rows, fields] = await conn.query("SELECT 1");
    console.log(rows);
    console.log("Connection is working");
    pool.releaseConnection(conn);
  } catch (err) {
    console.error("Error checking database connection:", err.message);
  }
};



module.exports = { getData, executeQuery, dbConnectionChecker };
