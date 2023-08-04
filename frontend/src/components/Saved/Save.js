import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

function Save() {
  const [savedPosts, setSavedPosts] = useState([]);

  const savePost = async (postid, index) => {
    const userid = localStorage.getItem("userid");
    try {
      const confirmbox = window.confirm("Are you want to unsave this post");
      if (confirmbox === true) {
        const response = await axios.post("http://localhost:3002/removepost", {
          userid: userid,
          postid: postid,
        });
        if (response.data.success) {
          toast.success("post unsaved");
          setSavedPosts(prevPosts => {
            const newPosts = [...prevPosts];
            newPosts.splice(index, 1); // Remove the post at the given index
            return newPosts;
          });
        }
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    toast.dismiss()
    const fetchpost = async () => {
      try {
        const userid = localStorage.getItem("userid");
        const response = await axios.get(`http://localhost:3002/Allsavedposts/${userid}`);
        if (response.data) {
          setSavedPosts(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchpost();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <div className="container" >
        {savedPosts.length === 0 ? (
          <div className="text-center mt-1 fs-3">No post yet saved or Your saved post may be deleted by their owner.
          
          <div>
            
            <img src="https://cdn-icons-png.flaticon.com/128/9961/9961881.png" alt="image"/></div></div>
        ) : (
          <div className="justify-content-center mt-5">
            {savedPosts.map((postItem, index) => (
              <div
                key={postItem.id}
                className="card mt-3 p-4"
                style={{ maxWidth: "400px", minWidth: "250px", margin: "auto" }}
              >
                <img className="card-img-top postimg" src={postItem.image} alt="image" 
                
                />
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
                    <div className="icons" onClick={() => savePost(postItem.postid,index)}>
                      <label className="like-label">saved</label>
                      <svg className="svgs" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Save;
