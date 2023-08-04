const express = require("express");
const DeletePost = express.Router();
module.exports = function(con){

    DeletePost.post("/",(req,res)=>{
        const {title,content,image} = req.body;
        con.query("DELETE FROM posts WHERE title = ? AND content = ? AND image = ? LIMIT 1",[title,content,image],(err,result)=>{
            console.log(err);
            if(err){
                return;
            }
            else{
                res.send(result)
            }

        })
    })
    return DeletePost;
}