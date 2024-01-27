// usre register query
const userRegisterQuery = (tableName) => {
  const query = `INSERT INTO ${tableName} (email, password, fullName, username) VALUES  (?, ?, ?, ?)`;
  return query;
};

// password update query

const passwordUpdateQuery = (tableName) => {
  const query = `UPDATE ${tableName} SET password = ? WHERE email = ?`;
  return query;
};

module.exports = { userRegisterQuery, passwordUpdateQuery };
