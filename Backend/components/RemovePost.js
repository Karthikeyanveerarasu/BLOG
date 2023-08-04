const express = require("express");
const RemovePost = express.Router();

module.exports = function(con){
    RemovePost.post("/",(req,res)=>{
        const {userid,postid} = req.body;
        const query = "DELETE FROM saved_posts WHERE user_id = ? AND post_id = ?";
        con.query(query, [userid, postid], (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({ error: "Failed to remove post from saved posts" });
            } else {
              res.json({ success: true });
            }
          });
    })
    return RemovePost;
}