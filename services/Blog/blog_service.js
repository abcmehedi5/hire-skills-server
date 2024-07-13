const { BlogModel } = require("../../models/blog-model/blog.model");

// create blog service
const createBlog = async (payload) => {
  const { title, content, image, category, date, email, author } = payload;
  const newBlog = new BlogModel({
    title,
    content,
    image,
    category,
    date,
    email,
    author,
  });
  try {
    const res = await newBlog.save();
    return res;
  } catch (error) {
    console.error("Error creating blog:", error);
    return false;
  }
};

// get blog by id service
const getBlog = async (id) => {
  try {
    const blog = await BlogModel.findById(id);
    return blog;
  } catch (error) {
    console.error("Error getting blog:", error);
    return null;
  }
};

const getCategoryBlog = async (category, currentPage, limit) => {
  const page = parseInt(currentPage) || 1;
  const limits = parseInt(limit) || 10;
  const skip = (page - 1) * limits; // total skip of number

  try {
    // Fetch all unique categories from the database
    const uniqueCategoriesFromDatabase = await BlogModel.distinct("category");
    const uniqueCategories = ["All", ...uniqueCategoriesFromDatabase];

    if (!category) {
      // Count total number of documents in the blogs collection
      const totalCount = await BlogModel.countDocuments({});
      // If no category is provided, return paginated blog posts for all categories
      const allBlogs = await BlogModel.find({}).limit(limits).skip(skip);
      if (!allBlogs || allBlogs.length === 0) {
        throw new Error("No blog data found.");
      }
      return { allBlogs, uniqueCategories, totalBlogs: totalCount };
    } else {
      // If a category is provided, return paginated blog posts for that category
      const getCategoryBlog = await BlogModel.find({ category })
        .limit(limits)
        .skip(skip);
      // Count total number of documents for the specified category
      const categoryTotalCount = await BlogModel.countDocuments({ category });
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
    console.error(error.message);
    throw error;
  }
};

// get my blog by email
const getMyblog = async (email) => {
  try {
    const blogs = await BlogModel.find({ email });
    return blogs;
  } catch (error) {
    console.error("Error getting blogs:", error);
    return [];
  }
};

// delete blog by id
const deleteBlog = async (blogId) => {
  try {
    const result = await BlogModel.findByIdAndDelete(blogId);
    return result;
  } catch (error) {
    console.error("Error deleting blog:", error);
    return null;
  }
};

module.exports = {
  createBlog,
  getBlog,
  getCategoryBlog,
  getMyblog,
  deleteBlog,
};
