const express = require('express');
const Post = express.Router();
module.exports = function (con){

  Post.post("/", (req, res) => {
    const { title, content, image,email } = req.body;
    con.query("INSERT INTO posts (title,content,image,email) VALUES(?,?,?,?)",[title,content,image,email],(err,data)=>{
      if(err){
       return console.log(err);
      }
      else{
return res.send({success : "yes"})
      }
    })
  });
  return Post;
}

 // Export the router
