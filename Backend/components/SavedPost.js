// savedPost.js (Express Router)
const express = require("express");
const SavedPost = express.Router();

module.exports = function (con) {
    console.log("saved posts ....")
  // Endpoint to fetch saved posts for a specific user
  SavedPost.get("/:userid", (req, res) => {
    const userid = req.params.userid;

    // SQL query to fetch saved post_ids for the given user
    const query = "SELECT post_id FROM saved_posts WHERE user_id = ?";

    con.query(query, [userid], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch saved posts" });
      } else {
        console.log(result);
        console.log("saved post is here ...")
        res.json(result);
      }
    });
  });

  return SavedPost;
};
