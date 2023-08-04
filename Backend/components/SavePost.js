const express = require("express");
const SavePost = express.Router();
module.exports = function(con){

    SavePost.post("/",(req,res)=>{
        const {userid,postid} = req.body;
        con.query("INSERT INTO saved_posts (user_id,post_id) VALUES(?,?)",[userid,postid],(err,result)=>{
            console.log(err);
            if(err){
                return;
            }
            res.send({success : "Post Saved"})
        })
      
    })
    return SavePost;
}