const express = require("express");
const RemoveLike = express.Router();

module.exports = function(con) {
    RemoveLike.post("/", (req, res) => {
        const { userid, postid } = req.body;
        console.log(userid)
        con.query("DELETE FROM likes WHERE user_id = ? AND post_id = ?", [userid, postid], (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({ error: "Error removing the likes" });
                return;
            }

            // Increment total_likes for the post in the "post" table
            con.query("UPDATE posts SET total_likes = total_likes - 1 WHERE postid = ?", [postid], (updateErr, updateResult) => {
                if (updateErr) {
                    console.log(updateErr);
                    res.status(500).send({ error: "Error updating total_likes for the post" });
                    return;
                }

               return res.send({ success: "Post unliked" });
            });
        });
    });

    return RemoveLike;
};
