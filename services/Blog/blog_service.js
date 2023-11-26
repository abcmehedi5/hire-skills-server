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

const getCategoryBlog = async (pool, category, currentPage, limit) => {
  const page = parseInt(currentPage) || 0;
  const limits = parseInt(limit) || 10;
  const skip = (page - 1) * limits; // total skip  of number
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
      // Count total number of rows in the blogs table
      const queryTotalCount = "SELECT COUNT(*) as totalCount FROM blogs";
      const [totalCountResult] = await pool.query(queryTotalCount);
      const totalCount = totalCountResult[0].totalCount;
      // If no category is provided, return paginated blog posts for all categories
      const queryAllBlogs = "SELECT * FROM blogs LIMIT ? OFFSET ?"; //OFFSET mieans skip
      const [allBlogs] = await pool.query(queryAllBlogs, [limits, skip]);

      if (!allBlogs || allBlogs.length === 0) {
        throw new Error("No blog data found.");
      }

      return { allBlogs, uniqueCategories, totalBlogs: totalCount };
    } else {
      // If a category is provided, return paginated blog posts for that category
      const queryGetCategoryBlog =
        "SELECT * FROM blogs WHERE category = ? LIMIT ? OFFSET ?";
      const [getCategoryBlog] = await pool.query(queryGetCategoryBlog, [
        category,
        limits,
        skip,
      ]);

      // Count total number of rows for the specified category
      const queryCategoryTotalCount =
        "SELECT COUNT(*) as totalCount FROM blogs WHERE category = ?";
      const [categoryTotalCountResult] = await pool.query(
        queryCategoryTotalCount,
        [category]
      );
      const categoryTotalCount = categoryTotalCountResult[0].totalCount;
      if (!getCategoryBlog || getCategoryBlog.length === 0) {
        throw new Error(
          `Oh! Sorry, no blog data found for category: ${category}. Please try again.`
        );
      }

      return {
        allBlogs: getCategoryBlog,
        uniqueCategories,
        totalBlogs: categoryTotalCount,
      };
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

// get my blog by email
const getMyblog = async (req, email) => {
  const query = `SELECT * FROM blogs WHERE email = ?`;
  const values = [email];
  const result = await getData(req.pool, query, values);
  return result;
};

// delete blog by id
const deleteBlog = async (pool, blogId) => {
  const query = `DELETE FROM blogs WHERE id = ?`;
  const values = [blogId];
  const result = await executeQuery(pool, query, values);
  return result;
};

module.exports = {
  blogServices,
  getBlog,
  getCategoryBlog,
  getMyblog,
  deleteBlog,
};
