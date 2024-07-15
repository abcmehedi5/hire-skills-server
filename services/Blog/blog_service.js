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

const getCategoryBlog = async (
  limit,
  skip,
  search,
  filters,
  sortField = "createdAt",
  sortOrder = "desc"
) => {
  try {
    let query = {};
    if (search) {
      query.$or = [{ title: { $regex: search, $options: "i" } }];
    }
    // apply filters if they are provided
    if (filters) {
      if (filters.category) {
        query.category = filters.category;
      }
    }

    // Determine sort order
    const sort = {};
    sort[sortField] = sortOrder?.toLowerCase() === "asc" ? 1 : -1;
    const totalItems = await BlogModel.countDocuments(filters);
    const res = await BlogModel.aggregate([
      { $match: query },
      { $sort: sort },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          // totalCount: [{ $count: "value" }],
        },
      },
    ]);
    if (res) {
      return {
        data: res[0].data,
        totalItems,
        isSuccess: true,
        message: "Blog retrieved successfully",
      };
    }
  } catch (error) {
    return {
      isSuccess: false,
      message: error.message,
    };
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
