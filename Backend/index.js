const express = require('express');
const mysql = require('mysql2');
const app = express();
const cors = require('cors');
const router = require('./components/Router');
const Post = require('./components/Post');
const Fetchpost = require('./components/Fetchpost');
const Login = require('./components/Login');
const DeletePost = require('./components/DeletePost');
const Update = require('./components/Update');
const AllPost = require('./components/AllPost');
const SavePost = require('./components/SavePost');
const SavedPost = require('./components/SavedPost');
const RemovePost = require('./components/RemovePost');
const FetchSavedPost = require('./components/FetchSavedPost');
const LikePost = require('./components/LikePost');
const RemoveLike = require('./components/RemoveLike');
const LikedPostIds = require('./components/LikedPostIds');
const Comment = require('./components/Comment');
const FetchComments = require('./components/FetchComments');
const Reply = require('./components/Reply');
const FetchReply = require('./components/FetchReply');
app.use(express.json({ limit: '5mb' }));

app.use(cors());
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "karthi"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("database connected!");
});
app.use("/register", router(con));
app.use("/login", Login(con));
app.use("/post", Post(con));
app.use("/fetchpost",Fetchpost(con))
app.use("/deletepost",DeletePost(con))
app.use("/updatepost", Update(con))
app.use("/allpost",AllPost(con))
app.use("/savepost",SavePost(con))
app.use("/savedposts",SavedPost(con))
app.use("/removepost",RemovePost(con));
app.use("/Allsavedposts",FetchSavedPost(con));
app.use("/likepost",LikePost(con));
app.use("/removelike",RemoveLike(con))
app.use("/likedpostids",LikedPostIds(con))
app.use("/comments",Comment(con))
app.use("/allcomments",FetchComments(con))
app.use("/reply",Reply(con))
app.use("/fetchreply",FetchReply(con))
app.listen(3002, () => {
  console.log("Server Started vro !");
});
