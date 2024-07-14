const { MESSAGE } = require("../../util/constant");
const {
  blogServices,
  getBlog,
  getCategoryBlog,
  getMyblog,
  deleteBlog,
  createBlog,
} = require("../../services/Blog/blog_service");

// create blog
const createBlogController = async (req, res) => {
  const payload = req.body;
  try {
    const data = await createBlog(payload);
    console.log(data);
    if (data) {
      return res.status(200).json({
        message: "Blog created successfull",
        status: 200,
        data,
      });
    }
    return res.status(500).json({ message: "blog not created" });
  } catch (error) {
    console.log(error);
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

// get blog by id
const getBlogById = async (req, res) => {
  try {
    const id = req.params.id;
    const blogData = await getBlog(req, id);
    if (blogData) {
      return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
        message: "Blog retrieved successfully",
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
        data: blogData,
      });
    } else {
      return res.status(MESSAGE.NOT_FOUND.STATUS_CODE).json({
        message: "Blog not found",
        status: MESSAGE.NOT_FOUND.STATUS_CODE,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

const getBlogByCategory = async (req, res) => {
  try {
    const category = req?.query?.category;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sortField = req?.query?.sortField || "createdAt";
    const search = req?.query?.search;
    const sortOrder = req?.query?.sortOrder || "desc";
    // filters
    let filters = {};
    // check type of filters
    if (category) {
      filters.category = category;
    }
    // Call your service function to get blog data by category
    const categoryBlogData = await getCategoryBlog(
      limit,
      skip,
      search,
      filters,
      sortField,
      sortOrder
    );
    return res.status(200).json({
      message: "Blog retrieved successfully",
      totalItems: categoryBlogData?.totalItems,
      isSuccess: categoryBlogData?.isSuccess,
      data: categoryBlogData.data,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// get blog by user email
const getMyblogByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const blogData = await getMyblog(req, email);
    if (blogData) {
      return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
        message: "Blog retrieved successfully",
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
        data: blogData,
      });
    } else {
      return res.status(MESSAGE.NOT_FOUND.STATUS_CODE).json({
        message: "Blog not found",
        status: MESSAGE.NOT_FOUND.STATUS_CODE,
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

// delete blog by id
const deleteBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deleteResult = await deleteBlog(req.pool, blogId);
    if (deleteResult) {
      return res.status(200).json({
        message: "Blog deleted successfully",
        status: 200,
      });
    } else {
      return res.status(500).json({
        message: "Blog not found!",
        status: 500,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

module.exports = {
  createBlogController,
  getBlogById,
  getBlogByCategory,
  getMyblogByEmail,
  deleteBlogById,
};
