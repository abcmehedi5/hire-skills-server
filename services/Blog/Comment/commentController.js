const { MESSAGE } = require("../../../util/constant");
const {
  commentServices,
  getCommentsByBlog,
  addReplyToComment,
  deleteComment,
} = require("../../../controllers/Blog/Comment/commentService");
const Joi = require("joi");

const commentSchema = Joi.object({
  blogId: Joi.number().required(),
  text: Joi.string().min(1).max(1000).required(),
  name: Joi.string().min(1).max(128).required(),
  date: Joi.string().min(1).max(128).required(),
  email: Joi.string().email().min(5).max(50).required(),
  image: Joi.string().min(1).max(128).optional(),
  replies: Joi.array().required(),
});

const replySchema = Joi.object({
  text: Joi.string().min(1).max(1000).required(),
  name: Joi.string().min(1).max(128).required(),
  date: Joi.string().min(1).max(128).required(),
  email: Joi.string().email().min(5).max(50).required(),
  image: Joi.string().min(1).max(128).required(),
});

// create comment by blog

const createComment = async (req, res) => {
  try {
    const result = await commentServices(req, req.body);
    if (result) {
      return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
        message: "Comment created successfully",
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
      });
    }
    return res.status(MESSAGE.NOT_FOUND.STATUS_CODE).json({
      message: "Comment not created",
      status: MESSAGE.NOT_FOUND.STATUS_CODE,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

// add reply in comment
const addReply = async (req, res) => {
  const commentId = req.params.commentId;
  try {
    const result = await addReplyToComment(req, req.body, commentId);
    if (result) {
      return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
        message: "Reply added successfully",
        status: MESSAGE.SUCCESS_GET.STATUS_CODE,
      });
    }
    return res.status(MESSAGE.NOT_FOUND.STATUS_CODE).json({
      message: "Failed to add reply",
      status: MESSAGE.NOT_FOUND.STATUS_CODE,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(MESSAGE.SERVER_ERROR.STATUS_CODE)
      .send(MESSAGE.SERVER_ERROR.CONTENT);
  }
};

// get comment by blog id

const getCommentsByBlogId = async (req, res) => {
  try {
    const comments = await getCommentsByBlog(req, req.params.blogId);
    return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json(comments);
  } catch (error) {
    console.error(error);
    return res.status(MESSAGE.SERVER_ERROR.STATUS_CODE).json({
      message: "Comment data not found.",
      status: MESSAGE.SERVER_ERROR.STATUS_CODE,
    });
  }
};

// remove comment by blog
const removeComment = async (req, res) => {
  try {
    const result = await deleteComment(req, req.params.id);
    return res.status(MESSAGE.SUCCESS_GET.STATUS_CODE).json({
      message: "Comment deleted successfully",
      status: MESSAGE.SUCCESS_GET.STATUS_CODE,
    });
  } catch (error) {
    console.error(error);
    return res.status(MESSAGE.SERVER_ERROR.STATUS_CODE).json({
      message: "Failed to delete the comment.",
      status: MESSAGE.SERVER_ERROR.STATUS_CODE,
    });
  }
};

module.exports = {
  createComment,
  addReply,
  getCommentsByBlogId,
  removeComment,
  commentSchema,
  replySchema,
};
