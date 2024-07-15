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
const getsingleDataQuery = (tableName, value) => {
  const query = `SELECT * FROM ${tableName} WHERE ${value} = ?`;
  return query;
};

// get property data
const getPropertyQuery = (property, table) => {
  return (query = `SELECT ${property}  FROM ${table}`); //ex: title, description......
};

module.exports = {
  countItems,
  getItemsPaginated,
  getsingleDataQuery,
  getPropertyQuery,
};
