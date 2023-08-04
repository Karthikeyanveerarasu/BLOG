const express = require("express");
const AllPost = express.Router();

module.exports = function (con) {
  AllPost.get("/", (req, res) => {
    const page = parseInt(req.query.page) || 1; // Get the 'page' query parameter or default to 1
    const limit = 30; // Number of posts per page

    const offset = (page - 1) * limit;

    const query = `
    SELECT posts.*, 
           (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.postid and comments.parent_comment_id is null) AS total_comments
    FROM posts
    LIMIT ${limit} OFFSET ${offset}
  `;
  

    con.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch posts" });
      } else {
     
        res.json(result);
      }
    });
  });

  return AllPost;
};
