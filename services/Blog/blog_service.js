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
const getBlog = async (req, id) => {
  const query = `SELECT * FROM blogs WHERE id = ?`;
  const values = [id];
  const result = await getData(req.pool, query, values);
  return result[0];
};

// get blog data by category service
const getCategoryBlog = async (pool, category) => {
  try {
    const uniqueCategories = ["All"];

    // Fetch all unique categories from the database
    const queryUniqueCategories = "SELECT DISTINCT category FROM blogs";
    const [uniqueCategoriesFromDatabase] = await pool.query(
      queryUniqueCategories
    );

    uniqueCategories.push(
      ...uniqueCategoriesFromDatabase.map((row) => row.category)
    );

    if (!category) {
      // If no category is provided, return all blog posts
      const queryAllBlogs = "SELECT * FROM blogs";
      const [allBlogs] = await pool.query(queryAllBlogs);

      if (!allBlogs || allBlogs.length === 0) {
        throw new Error("No blog data found.");
      }

      return { allBlogs, uniqueCategories };
    } else {
      // If a category is provided, filter by category
      const queryGetCategoryBlog = "SELECT * FROM blogs WHERE category = ?";
      const [getCategoryBlog] = await pool.query(queryGetCategoryBlog, [
        category,
      ]);

      if (!getCategoryBlog || getCategoryBlog.length === 0) {
        throw new Error(
          `Oh! Sorry, no blog data found for category: ${category}. Please try again.`
        );
      }

      return { allBlogs: getCategoryBlog, uniqueCategories };
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = { blogServices, getBlog, getCategoryBlog };
