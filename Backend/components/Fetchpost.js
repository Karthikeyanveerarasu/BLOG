const express = require("express");
const FetchPost = express.Router();

module.exports = function (con) {
  FetchPost.get("/", (req, res) => {
    const email = req.query.email; 
    con.query("SELECT * FROM posts WHERE email = ?", [email], (err, result) => {
      if (err) {
        console.log("Error fetching posts:", err);
        return res.status(500).json({ error: "Error fetching posts" });
      }
      if (result && result.length > 0) {
        console.log("Posts fetched successfully");
        return res.status(200).json(result);
      } else {
        console.log("No posts found for the user");
        return res.status(404).json({ message: "No posts found for the user" });
      }
    });
  });

  return FetchPost;
};
