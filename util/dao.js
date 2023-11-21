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
  console.log(values);
  try {
    const [rows, field] = await pool.query(query, values);
    return rows.affectedRows > 0;
  } catch (err) {
    console.log(err.message);
  }
};


const dbConnectionChecker = async (pool) => {
  pool.getConnection(function (err, conn) {
    console.log(conn);
    const [rows, field] = conn.query("select 1");
    console.log(rows);
    console.log("I am working");
    pool.releaseConnection(conn);
  });
};

module.exports = { getData, executeQuery, dbConnectionChecker };
