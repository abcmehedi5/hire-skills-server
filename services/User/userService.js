const { executeQuery, getData } = require("../../util/dao");

const userServices = async (pool, payload) => {
  return await createUser(pool, payload);
};

const createUser = async (pool, payload) => {
  const {
    displayName,
    image,
    phoneNumber,
    date,
    email,
    role,
    status,
    bio,
    birthday,
    gender,
  } = payload;
  const query = `INSERT INTO users (displayName, image, phoneNumber, date, email, role, status, bio, birthday, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    displayName,
    image,
    phoneNumber,
    date,
    email,
    role,
    status,
    bio,
    birthday,
    gender,
  ];
  const insert = await executeQuery(pool, query, values);
  if (insert) {
    return true;
  }
  return false;
};

const getUsers = async (pool) => {
  const query = `SELECT * FROM users`;
  const users = await getData(pool, query);
  return users;
};

const getSingleUser = async (pool, email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const values = [email];
  const user = await getData(pool, query, values);
  return user[0];
};

// free enroll register area --------------------
const freeEnrollRegisterService = async (pool, payload) => {
  const { name, phoneNumber, date, email, gender, department, address } =
    payload;
  const query = `INSERT INTO enroll (name, phoneNumber, date, email, gender, department, address) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [name, phoneNumber, date, email, gender, department, address];
  const insert = await executeQuery(pool, query, values);
  if (insert) {
    return insert;
  }
  return false;
};

//get free enroll  user data
const getFreeEnrollUser = async (pool) => {
  const query = `SELECT * FROM enroll`;
  const result = await getData(pool, query);
  return result;
};

// check admin by users--------------------
const getCheckRole = async (pool, email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  const values = [email];
  const result = await getData(pool, query, values);
  const role = result[0].role;
  return { role };
};

module.exports = {
  userServices,
  getUsers,
  getSingleUser,
  freeEnrollRegisterService,
  getCheckRole,
  getFreeEnrollUser
};
