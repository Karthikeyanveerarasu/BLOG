const express = require("express");
const FetchComment = express.Router();

module.exports = function (con) {
  FetchComment.get("/:postid", (req, res) => {
    const postid = req.params.postid; // Use req.params.postid directly
    const sqlQuery = `
      SELECT c.content, l.name,c.id
      FROM comments c
      INNER JOIN login l ON c.user_id = l.id
      WHERE c.post_id = ? and c.parent_comment_id is null;
    `;

    con.query(sqlQuery, [postid], (err, data) => {
      if (err) {
        return console.log(err);
      } else {
        console.log(data);
        return res.send(data);
      }
    });
  });

  return FetchComment;
};
