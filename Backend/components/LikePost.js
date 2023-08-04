const express = require("express");
const LikePost = express.Router();

module.exports = function(con) {
    LikePost.post("/", (req, res) => {
        const { userid, postid } = req.body;
        con.query("INSERT INTO likes (user_id, post_id) VALUES (?, ?)", [userid, postid], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: "Error saving the post" });
                return;
            }
            con.query("UPDATE posts SET total_likes = total_likes + 1 WHERE postid = ?", [postid], (updateErr, updateResult) => {
                if (updateErr) {
                    console.log(updateErr);
                    res.status(500).send({ error: "Error updating total_likes for the post" });
                    return;
                }

               return res.send({ success: "Post liked" });
            });
        });
    });

    return LikePost;
};
