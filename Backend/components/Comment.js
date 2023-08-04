const express = require("express");
const Comment = express.Router();

module.exports = function (con) {
  Comment.post("/", (req, res) => {
    const { comment, userid, postid, parent_comment_id } = req.body;
    console.log(comment, userid, postid, parent_comment_id);

    if (userid === "" || postid === "") {
      return res.send({ error: "error" });
    }

    // Set a default value (null) for parent_comment_id if it is missing or undefined
    const insertQuery = "INSERT INTO comments(content, user_id, post_id, parent_comment_id) VALUES (?, ?, ?, ?)";
    const insertValues = [comment, userid, postid, parent_comment_id ?? null];

    con.query(insertQuery, insertValues, (err, data) => {
      if (err) {
        console.log(err);
        return res.send({ error: "error" });
      } else {
        return res.send({ success: "success" });
      }
    });
  });

  return Comment;
};
