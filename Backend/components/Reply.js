const express = require("express");
const Reply = express.Router();

module.exports = function(con){
    Reply.post("/",(req,res)=>{
        const {reply,commentid,userid,postid }=req.body;
    console.log(commentid + "reply sending . . .");
        const insertQuery = "INSERT INTO comments(content, user_id, post_id, parent_comment_id) VALUES (?, ?, ?, ?)";
        const insertValues = [reply, userid, postid,commentid];
        con.query(insertQuery, insertValues, (err, data) => {
            if (err) {
              console.log(err);
              return res.send({ error: "error" });
            } else {
              return res.send({ success: "success" });
            }
          });
    })
    return Reply;
}