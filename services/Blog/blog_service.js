// create blog

const { executeQuery, getData } = require("../../util/dao");

const blogServices = async (req, payload) => {
  return await createBlog(req, payload); // calling function createBlog
};

// create blog service
const createBlog = async (req, payload) => {
  const { title, content, image, category, date, email, author } = payload;
  const query = `INSERT INTO blogs (title, content, image, category, date, email, author) VALUES(?,?,?,?,?,?,?)`;
  const values = [title, content, image, category, date, email, author];
  const insert = await executeQuery(req.pool, query, values);
  if (insert) {
    return true;
  }
  return false;
};


// get blog by id service
const  getBlog = async (req, id) => {
  const query = `SELECT * FROM blogs WHERE id = ?`;
  const values = [id];
  const result = await getData(req.pool, query, values);
  return result[0]
};

module.exports = {blogServices , getBlog};
