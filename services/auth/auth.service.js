const { usrRegisterQuery } = require("../../sql_queries/authSqlQuery");
const { getsingleDataQuery } = require("../../sql_queries/sqlQuery");
const { getData, executeQuery } = require("../../util/dao");
const bcrypt = require("bcrypt");
const registerService = async (req, body) => {
  const { email, password: pass, fullName, username } = body;
  // hash password
  const password = await bcrypt.hash(pass, 10);
  // get single user by email
  const userCheckQuery = getsingleDataQuery("users", "email");
  // get single user by user name
  const userNameCheckQuery = getsingleDataQuery("users", "username");
  // register query
  const registerQuery = usrRegisterQuery("users");
  const emailCheckValue = [email];
  const userNameCheckValue = [username];
  const registerValue = [email, password, fullName, username];
  // get single user bye email
  const getCheckEmail = await getData(req.pool,userCheckQuery,emailCheckValue);
  // get single user user id
  const getCheckUsername = await getData(req.pool,userNameCheckQuery,userNameCheckValue);

  if (getCheckEmail.length > 0) {
    return { message: "Already registered with this email", register: false };
  }

  if (getCheckUsername.length > 0) {
    return { message: "Username already used", register: false };
  }

  const register = await executeQuery(req.pool, registerQuery, registerValue);
  return {
    message: "Registration successfull",
    error: false,
    register: register,
  };
};

module.exports = { registerService };
