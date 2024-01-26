// get count all items in the table
const countItems = (tableName) => {
  const query = `SELECT COUNT(*) as totalItems FROM ${tableName}`;
  return query;
};

// get all paginated data
const getItemsPaginated = (tableName) => {
  const query = `SELECT * FROM ${tableName} LIMIT ? OFFSET ?`; // ofset = skip of data
  return query;
};

// get single data by id
const getsingleDataQuery = (tableName) => {
  const query = `SELECT * FROM ${tableName} WHERE id = ?`;
  return query;
};

module.exports = { countItems, getItemsPaginated, getsingleDataQuery };
