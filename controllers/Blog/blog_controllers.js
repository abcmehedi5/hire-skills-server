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
    console.log(data)
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
    // pagination
    const currentPage = req?.query?.currentPage;
    const limit = req?.query?.limit;
    // Call your service function to get blog data by category
    const categoryBlogData = await getCategoryBlog(
      req.pool,
      category,
      currentPage,
      limit
    );

    return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
      message: "Blog retrieved successfully",
      status: MESSAGE.SUCCESS_GET.STATUS_CODE,
      data: categoryBlogData,
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
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
