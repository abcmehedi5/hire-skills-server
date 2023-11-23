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

module.exports = {
  userServices,
  getUsers,
  getSingleUser,
};
