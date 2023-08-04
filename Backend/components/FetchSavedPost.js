// savedPost.js (Express Router)
const express = require("express");
const FetchSavedPost = express.Router();
module.exports = function (con) {
    console.log("fetching saved posts ....")
  // Endpoint to fetch saved posts for a specific user
  FetchSavedPost.get("/:userid", (req, res) => {
    const userid = req.params.userid;
    console.log(userid);
    // SQL query to fetch saved post_ids for the given user
    const query = "SELECT * FROM posts INNER JOIN saved_posts ON posts.postid = saved_posts.post_id WHERE saved_posts.user_id = ?";

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

  return FetchSavedPost;
};