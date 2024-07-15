const bcrypt = require("bcryptjs");
const hash = (password) => {
  const hashPassword = bcrypt.hash(password, 10);
  return hashPassword;
};

module.exports = hash;
