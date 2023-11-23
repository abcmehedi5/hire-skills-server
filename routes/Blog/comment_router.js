const express = require("express");
const { API } = require("../../util/constant");
const validator = require("../../middlewares/validator_middleware");
const {
  createComment,
  addReply,
  getCommentsByBlogId,
  removeComment,
  commentSchema,
  replySchema,
} = require("../../services/Blog/Comment/commentController");

const commentRouter = express.Router();

// Create a comment
commentRouter.post(
  API.API_CONTEXT + "comment/create",
  validator(commentSchema), // Replace with your comment schema
  createComment
);

// Add a reply to a comment
commentRouter.post(
  API.API_CONTEXT + "comment/:commentId/reply",
  validator(replySchema), // Replace with your reply schema
  addReply
);

// Get comments by blog ID
commentRouter.get(
  API.API_CONTEXT + "comment/get-comments/:blogId",
  getCommentsByBlogId
);

// Delete a comment by ID
commentRouter.delete(
  API.API_CONTEXT + "comment/delete-comment/:id",
  removeComment
);

module.exports = commentRouter;
