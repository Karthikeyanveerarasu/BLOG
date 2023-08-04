const express = require("express");
const FetchReply = express.Router();
module.exports = function(con){

    FetchReply.get("/:commentId",async(req,res)=>{
        const commentid = req.params.commentId;
       con.query("select c.content,l.name from comments c inner join login l on c.user_id = l.id where c.parent_comment_id = ?",[commentid],(err,result)=>{
        console.log(err);
        if(err){
            return res.send({err : "something went wrong try again later !"})
        }
        console.log("result");
        res.json(result)
       })
    
    })
    return FetchReply;
}