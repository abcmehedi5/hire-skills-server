// usre register query
const usrRegisterQuery = (tableName) => {
  const query = `INSERT INTO ${tableName} (email, password, fullName, username) VALUES  (?, ?, ?, ?)`;
  return query;
};

module.exports = { usrRegisterQuery };
