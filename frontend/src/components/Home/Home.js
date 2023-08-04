import Badge from 'react-bootstrap/Badge';
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { TypeAnimation } from "react-type-animation";
import toast, { Toaster } from "react-hot-toast";
import "./home.css";
import { useNavigate } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import FullscreenImage from './FullscreenImage';
function Home() {

  const [commentReplies, setCommentReplies] = useState({});
  const [isFullscreen, setIsFullscreen] = useState(false);
const [fullscreenImage, setFullscreenImage] = useState('');

const handleImageClick = (imageSrc) => {
  setFullscreenImage(imageSrc);
  setIsFullscreen(true);
};

const handleCloseFullscreen = () => {
  setIsFullscreen(false);
};
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [savedPostIds, setSavedPostIds] = useState([]);
  const [likedPostIds, setLikedPostIds] = useState([]);
  const [show, setShow] = useState(false);
  const[comment,SetComment]=useState("");
  const navigate = useNavigate();
  const [allcomments, setAllComments] = useState([]);
  const[reply,Setreply]=useState({});
  const fetchLikedPostIds = useCallback(async () => {
    try {
      const userid = localStorage.getItem("userid");
      const response = await axios.get(
        `http://localhost:3002/likedpostids/${userid}`
      );
      setLikedPostIds(response.data.map((likedPost) => likedPost.post_id));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchSavedPosts = useCallback(async () => {
    console.log("hello aby");
    try {
      const userid = localStorage.getItem("userid");
      const response = await axios.get(
        `http://localhost:3002/savedposts/${userid}`
      );
      setSavedPostIds(response.data.map((savedPost) => savedPost.post_id));
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchPost = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3002/allpost", {
        params: { page, limit: 30 },
      });
      if (response.data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...response.data]);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log(err);
    }
  }, [page]);

  const handleScroll = useCallback(() => {
    if (
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [hasMore]);

  const likePost = useCallback(
    async (postid) => {
      const userid = localStorage.getItem("userid");
      console.log(userid);
      console.log(postid);
      try {
        if (likedPostIds.includes(Number(postid))) {
          const confirmbox = window.confirm(
            "Are you sure want to unlike this post ?"
          );
          if (confirmbox === true) {
            const response = await axios.post(
              "http://localhost:3002/removelike",
              {
                userid: userid,
                postid: postid,
              }
            );
            if (response.data.success) {
              toast("Post unliked!", {
                icon: "😢",
              });

              setPosts((prevPosts) =>
                prevPosts.map((post) => {
                  if (post.postid === postid) {
                    return { ...post, total_likes: post.total_likes - 1 };
                  } else {
                    return post;
                  }
                })
              );

              setLikedPostIds((prevLikedPostIds) =>
                prevLikedPostIds.filter((id) => id !== postid)
              );
            }
          } else {
            return;
          }
        } else {
          const response = await axios.post("http://localhost:3002/likepost", {
            userid: userid,
            postid: postid,
          });
          if (response.data.success) {
            toast("Post liked!", {
              icon: "❤️",
            });

            setPosts((prevPosts) =>
              prevPosts.map((post) => {
                if (post.postid === postid) {
                  return { ...post, total_likes: post.total_likes + 1 };
                } else {
                  return post;
                }
              })
            );

            setLikedPostIds((prevLikedPostIds) => [...prevLikedPostIds, postid]);
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    [likedPostIds]
  );

  const savePost = useCallback(
    async (postid) => {
      const userid = localStorage.getItem("userid");
      try {
        if (savedPostIds.includes(postid)) {
          const confirmbox = window.confirm("Are you want to unsave this post");
          if (confirmbox === true) {
            const response = await axios.post(
              "http://localhost:3002/removepost",
              {
                userid: userid,
                postid: postid,
              }
            );
            if (response.data.success) {
              toast.success("post unsaved");
            }
            console.log(response.data);
            setSavedPostIds((prevSavedPostIds) =>
              prevSavedPostIds.filter((id) => id !== postid)
            );
          } else {
            return;
          }
        } else {
          const response = await axios.post("http://localhost:3002/savepost", {
            userid: userid,
            postid: postid,
          });
          console.log(response.data);
          if (response.data.success) {
            toast.success(response.data.success);
          }
          setSavedPostIds((prevSavedPostIds) => [...prevSavedPostIds, postid]);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [savedPostIds]
  );

  useEffect(() => {
    toast.dismiss();
    if (localStorage.getItem("email") === "" || localStorage.getItem("email") === null) {
      navigate("/signup");
      return;
    }
    fetchSavedPosts();
    fetchPost();
    fetchLikedPostIds();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, hasMore, fetchSavedPosts, fetchPost, fetchLikedPostIds, navigate, handleScroll]);
  
  ///comments 
  const commentpanalama = async (postid) => {
    localStorage.setItem("postid", postid);
    try {
      const commentResponse = await axios.get(`http://localhost:3002/allcomments/${postid}`);
      if (commentResponse.data) {
        const commentArray = commentResponse.data.map((commentItem) => ({
          id: commentItem.id,
          content: commentItem.content,
          name: commentItem.name,
          showReplyInput: false,
          showReplies: false, 
        }));
        setAllComments(commentArray);
        console.log(commentResponse.data);
      }
    } catch (err) {
      console.log(err);
    }
    setShow(true);
  };
  const handleToggleReply = async (commentId,show) => {
    
    setAllComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, showReplyInput: !comment.showReplyInput, showReplies: !comment.showReplies }
          : comment
      )
    );
    try {
      if(show){
        return
      }   
        console.log("reply clicked");
        const reply = await axios.get(`http://localhost:3002/fetchreply/${commentId}`);
        if (reply.data) {
          setCommentReplies((prevCommentReplies) => ({
            ...prevCommentReplies,
            [commentId]: reply.data,
          }));
        
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  
  
  
  const commentpotan = async(e)=>{
e.preventDefault();
if(comment===""){
  return;
}
else{
  const userid = localStorage.getItem("userid")
  const postid =localStorage.getItem("postid");
  try{
    const response = await axios.post("http://localhost:3002/comments",{
      comment:comment,
      userid:userid,
      postid:postid
    })
    if(response.data.success){
      toast.success("Comment posted");
      const newComment = {
        content: comment,
        name: localStorage.getItem("name"),
      };
      setAllComments((prevComments) => [...prevComments, newComment]);
      SetComment("");
    }

  } catch(err){
    console.log(err);
  }
}
  }

  /////handle repliess
  const replystarted = async (commentsid) => {
    console.log(commentsid);
    
    const userid = localStorage.getItem("userid");
    const postid = localStorage.getItem("postid");
    try {
      const response = await axios.post("http://localhost:3002/reply", {
        reply: reply[commentsid],
        userid: userid,
        postid: postid,
        commentid: commentsid,
      });
      if (response.data.success) {
        toast.success("Reply posted");
          setCommentReplies((prevCommentReplies) => {
          const updatedReplies = {
            ...prevCommentReplies,
            [commentsid]: [
              ...(prevCommentReplies[commentsid] || []), {
                id: response.data.replyId, 
                content: reply[commentsid],
                name: localStorage.getItem("name"),
              },
            ],
          };
          return updatedReplies;
        });
  
        Setreply((prevInputs) => ({ ...prevInputs, [commentsid]: "" }));
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <>
      <Toaster position="top-center" />
      <div className="container" >
        <div className="mt-4">
          <div style={{ height: "50px" }}>
            <p className="text-center fs-3 text-muted" style={{ letterSpacing: ".7px" }}>
              Share your stories here and{" "}
              <TypeAnimation
                sequence={["inspire", 1000, "inspire others!", 1000, "inspire", 1000, "", 1000]}
                speed={50}
                style={{ fontSize: "1em" }}
                repeat={Infinity}
              />
            </p>
          </div>
          {isFullscreen && (
  <FullscreenImage imageSrc={fullscreenImage} onClose={handleCloseFullscreen} />
)}

          {posts.length === 0 ? (
            <div className="text-center mt-4 display-6">No post yet</div>
          ) : (
            <div className="justify-content-center mt-5">
             
             
              {posts.map((postItem) => (
                <div
                  key={postItem.id}
                  className="card mt-3 p-4"
                  style={{ maxWidth: "400px", minWidth: "250px", margin: "auto" }}
                >
                  <img className="card-img-top postimg" src={postItem.image} alt="Card cap" onClick={() => handleImageClick(postItem.image)} />
                  <div className="card-title text-center">
                    <h5
                      style={{
                        fontFamily: "monospace",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      {postItem.title}
                    </h5>
                  </div>
                  <div className="card-body text-start">
                    <p className="">{postItem.content}</p>
                  </div>
                  <div className="like-dislike-container d-flex">
                    <div className="icons-box">
                      <div className="icons" onClick={() => likePost(postItem.postid)}>
                        <label className="like-label">{postItem.total_likes}</label>
                        <svg
                          className="svgs"
                          id="icon-like"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z"></path>
                        </svg>
                      </div>
                      <div className="icons" onClick={() => savePost(postItem.postid)}>
                        <label className="like-label">
                          {savedPostIds.includes(postItem.postid) ? "Saved" : "Save"}
                        </label>
                        <svg
                          className="svgs"
                          viewBox="0 0 384 512"
                          height="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path>
                        </svg>
                      </div>
                      <div className="icons" title="comments" onClick={()=>commentpanalama(postItem.postid)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="1em" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
  <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg>
<Badge pill bg="secondary">{postItem.total_comments}</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    <div className="comments">
    <Modal show={show} fullscreen={true} onHide={() => {
      setShow(false)
      window.location.reload();
      }}>
        <Modal.Header closeButton>
          <Modal.Title>  <img src="/image/logo.png" alt="Logo" width="100px"/></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container w-100 mt-4">
          <label className="fs-6 my-3">Leave your comments :</label>
          <textarea className="form-control"
          required={true}
          value={comment}
          onChange={(e)=>SetComment(e.target.value)}
          style={{
            resize:"none"
          }}/>
          <div className="text-center">
          <button type="button" className="btn btn-primary mt-3" onClick={commentpotan}>submit </button>
          </div>
          <div className="mt-5">
            <hr />
            {allcomments.map((commentContent) => (
  <div key={commentContent.id} className="p-4 rounded shadow mt-5 mb-2">
    <cite title="Source Title" className="text-danger">@{commentContent.name}</cite>
    <p className="text-muted mt-3" style={{
      height: "auto",
      overflowWrap: "break-word",
      fontSize: "15px",
      letterSpacing: ".7px"
    }}>{commentContent.content}</p>
    {commentContent.showReplyInput && (
      <div className='mt-4 my-4'>
      <input
        type="text"
        name="text"
        class="input"
        value={reply[commentContent.id] || ""}
        onChange={(e) => Setreply((prevInputs) => ({ ...prevInputs, [commentContent.id]: e.target.value }))}
        placeholder="Enter your reply..."
      />
      <button className='mt-3 reply' onClick={() => replystarted(commentContent.id,reply[commentContent.id])}>Submit</button>
    </div>
    )}
    <button className="button reply" onClick={() => handleToggleReply(commentContent.id,commentContent.showReplyInput)}>
      {commentContent.showReplyInput ? "Hide" : "Replys"}
    </button>
    {commentContent.showReplies && commentReplies[commentContent.id] && (
      <div>
        <p className='mt-4 fs-5'>Replies :</p>
        {commentReplies[commentContent.id].map((reply) => (
          <div key={reply.id} className="p-4 bg-dark mt-2 rounded">
            <cite title="Source Title" className="text-danger">@{reply.name}</cite>
            <p className="mt-3 text-white" style={{ color:"white",height: "auto", overflowWrap: "break-word", fontSize: "15px", letterSpacing: ".7px" }}>{reply.content}</p>
          </div>
        ))}
      </div>
    )}
  </div>
))}


          </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
    </>
  );
}

export default Home;
