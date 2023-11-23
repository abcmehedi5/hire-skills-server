const { executeQuery, getData } = require("../../../util/dao");

const commentServices = async (req, payload) => {
  return await createComment(req, payload);
};

// create comment by blog
const createComment = async (req, payload) => {
  const { blogId, text, name, date, email, image } = payload;
  const query = `INSERT INTO comments (blogId, text, name, date, email, image) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [blogId, text, name, date, email, image];
  const insert = await executeQuery(req.pool, query, values);
  if (insert) {
    return true;
  }
  return false;
};

// reply in comment by blog
const addReplyToComment = async (req, payload, commentId) => {
  const { text, name, date, email, image } = payload;
  const query = `INSERT INTO replies (commentId, text, name, date, email, image) VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [commentId, text, name, date, email, image];
  const insert = await executeQuery(req.pool, query, values);
  if (insert) {
    return true;
  }
  return false;
};

// get comment by blog
const getCommentsByBlog = async (req, blogId) => {
  const query = `SELECT * FROM comments WHERE blogId = ?`;
  const values = [blogId];
  const comments = await getData(req.pool, query, values);

  // Fetch replies for each comment
  for (const comment of comments) {
    const replyQuery = `SELECT * FROM replies WHERE commentId = ?`;
    const replyValues = [comment.id];
    const replies = await getData(req.pool, replyQuery, replyValues);
    comment.replies = replies;
  }
  return comments;
};

// delete comment by blog
const deleteComment = async (req, commentId) => {
  const query = `DELETE FROM comments WHERE id = ?`;
  const values = [commentId];
  const result = await executeQuery(req.pool, query, values);
  return result;
};

module.exports = {
  commentServices,
  addReplyToComment,
  getCommentsByBlog,
  deleteComment,
};
