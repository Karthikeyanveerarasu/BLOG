import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import "./post.css"
import axios from 'axios'
function Post() {
  const[post,SetPost]=useState([]);
  const [change, setChange] = useState(false);
    const [show, setShow] = useState(false);
    const[secondshow,SetSecondShow]=useState(false);
    const handleClose = () => setShow(false);
    const UpdatedClose= ()=> {
      SetSecondShow(false);
      setChange(false)
    }
    const handleShow = () => setShow(true);
    const UpdatedShow =()=>SetSecondShow(true)
    const[title,Settitle]=useState("")
    const[content,SetContent]=useState("")
    const[image,SetImage]=useState("");
    ///updated state
    const[updatedtitle,SetUpdatedtitle]=useState("");
    const[updatedcontent,Setupdatedcontent]=useState("");
    const[updatedImage,SetUpdatedimage]=useState("");
  

    ///////////// edit post page . . .
const editposts =(tit,con,img)=>{
  
 const confirmedit = window.confirm("Are you sure wants to edit this post ?")
 if(confirmedit){
  localStorage.setItem("oldtitle",tit);
  localStorage.setItem("oldcon",con);
  localStorage.setItem("oldimg",img);
  SetUpdatedtitle(tit);
  Setupdatedcontent(con);
  SetUpdatedimage(img);
  UpdatedShow();
 }
}
////delete 
const deleteclickpanitan =(tit,con,img)=>{
 const confirmbox= window.confirm("Are you sure want to delete this post ?")
 if(confirmbox===true){
  deletepost(tit,con,img)
 }

}
const deletepost = async (tit, con, img) => {
  console.log(con);
  await axios
    .post("http://localhost:3002/deletepost", {
      title: tit,
      content: con,
      image: img,
    })
    .then((response) => {
      const indexToDelete = post.findIndex(
        (postItem) =>
          postItem.title === tit && postItem.content === con && postItem.image === img
      );
  
      if (indexToDelete !== -1) {
        const updatedPosts = [...post];
        updatedPosts.splice(indexToDelete, 1);
        toast.success("post deleted");
        SetPost(updatedPosts);
      }
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
    });
};

 const postpodran =()=>{
  handleShow();
 }
 const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
 const handleupdateimage = async(e)=>{
  const file = e.target.files[0];
  const fileType = file.type;
  if (!file) {
    return; // No file selected
  }

  console.log(fileType)

  // Check if the selected file type is allowed
  if (!allowedTypes.includes(fileType)) {
    alert("Please select a valid image file (JPEG, PNG, or GIF).");
    e.target.value = null;
    return;
  }
  const fileSizeInMB = file.size / (1024 * 1024);  ///      
  const maxAllowedSizeInMB = 2;
  if (fileSizeInMB > maxAllowedSizeInMB) {
    alert(`Please select an image within ${maxAllowedSizeInMB} MB.`);
    e.target.value = null;
    return;
  }
  const base = await baseConverter(file);
  SetUpdatedimage(base);
 }
    const handleimage = async(e)=>{
          const file = e.target.files[0];
          const fileType = file.type
  if (!allowedTypes.includes(file.type)) {
    alert("Please select a valid image file (JPEG, PNG, or GIF).");
    e.target.value = null;
    return;
  }
          const fileSizeInMB = file.size / (1024 * 1024);  ///      
          const maxAllowedSizeInMB = 2;
          const minAllowedSizeInMB = 0.1;
          if (fileSizeInMB > maxAllowedSizeInMB) {
            alert(`Please select an image within ${maxAllowedSizeInMB} MB.`);
            e.target.value = null;
            return;
          }
          const base = await baseConverter(file);
          SetImage(base);
    }

    const baseConverter = (file) => {
      return new Promise((resolve, reject)=>
      {
        
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
      })
    }
    const updatenow = async(closemodel)=>{
      const tit = localStorage.getItem("oldtitle");
      const email = localStorage.getItem("email");
      const con = localStorage.getItem("oldcon");
      const img = localStorage.getItem("oldimg");
      console.log(localStorage.getItem("oldtitle"),updatedtitle);
      try{
        const response = await axios.post("http://localhost:3002/updatepost",{
        updatedtitle : updatedtitle,
        updatedcontent : updatedcontent,
        updatedImage : updatedImage,
        oldtitle : tit,
        oldcontent : con,
        oldimage : img,
        email : email
        }) 

        if(response.data.message){
          const updatedPost = {
            title: updatedtitle,
            content: updatedcontent,
            image: updatedImage,
          };
         
          const updatedPosts = post.map((postItem) =>
            postItem.title === tit && postItem.content === con && postItem.image === img
              ? updatedPost
              : postItem
          );
         
          SetPost(updatedPosts);
           toast.success(response.data.message);
           localStorage.removeItem("oldtitle");
           localStorage.removeItem("oldimg");
           localStorage.removeItem("oldcon");
           console.log(localStorage.getItem("oldcon"))
          closemodel();
          return
        }
        if(response.data.error){
          return toast.error(response.data.error)
        }
     
      } catch(err){
        console.log(err);
        return;
      }
    }
    const createnow = async () => {
      const email = localStorage.getItem("email");
      try {
        const response = await axios.post("http://localhost:3002/post", {
          title: title,
          content: content,
          image: image,
          email: email,
        });
        if (response.data.success) {
          const newPost = {
            title: title,
            content: content,
            image: image,
          };
  
          SetPost((prevPosts) => [...prevPosts, newPost]);
          SetContent("");
          handleClose(); 
        } else {
          console.log("Post creation failed:", response.data.message);
        }
      } catch (error) {
        // Handle error if needed
        console.error("Error creating post:", error);
      }
    };
    
    useEffect(() => {
      const email = localStorage.getItem("email");
      toast.dismiss()
      console.log("Email in React:", email); 
      const fetchPosts = async () => {
        try {
          const response = await axios.get("http://localhost:3002/fetchpost", {
            params: { email: email }, 
          });
          SetPost(response.data);
        } catch (error) {
          console.error("Error fetching posts:", error);
        }
      };
      fetchPosts();
    }, []);
    
    return (
        <>
        <Toaster 
        position='top-center'
        />
        <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="email"
                placeholder="Title of your post"
                autoFocus
                required={true}
                onChange={(e)=>Settitle(e.target.value)}
              />
            </Form.Group>
            <div className='my-4 mt-4'> <label class="form-label" for="customFile">Image of Your post</label>
<input type="file" class="form-control" id="customFile" onChange={(e)=>handleimage(e)}/></div>
           
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder='Content of your post'
              required={true}
              style={{ resize: 'none' }}
              value={content}
             onChange={(e)=>SetContent(e.target.value)}

              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="dark" onClick={createnow}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
         <div className="container">
     <div className="text-center mt-5">
    <button className="btn btn-dark" onClick={postpodran}>Create New Post</button>
     </div>
     <div className="mt-5">
        <h2 className="text-center">Your Posts</h2>
        {post.length ==0 ? <div className='text-center mt-5 display-6'>
          No post yet
        </div> : <>
        <div className='justify-content-center'>
        {post.map((postItem) => (
              <div key={postItem.id} className='card mt-3 p-4' style={{ maxWidth: '400px', minWidth: '250px',margin:"auto"}}>
                <img className="card-img-top" src={postItem.image} alt="Card cap" />
                <div className='card-title text-center'>
                  <h5 style={{
                    fontFamily:"monospace",
                    fontSize:"18px",
                    fontWeight:"bold"
                  }}>{postItem.title}</h5>
                </div>
                <div className='card-body text-start'>
                 <p className=''>{postItem.content}</p> 
                </div>
          <div className='container text-center' > 
<span className='btn btn-dark' onClick={()=>editposts(postItem.title,postItem.content,postItem.image)}>Edit the post</span>
<span className='btn btn-danger mx-3' onClick={()=>deleteclickpanitan(postItem.title,postItem.content,postItem.image)}>Delete</span>
          </div>
              </div>
            ))}
          
        
        </div>
        </>}
     
     </div>
    </div>
{/* Edit post model with updated value   */}
<div className='editpostmodel'>
<Modal show={secondshow} onHide={UpdatedClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label><strong>Title</strong></Form.Label>
              <Form.Control
                type="name"
                placeholder="Title of your post"
                autoFocus
                required={true}
                value={updatedtitle}
                onChange={(e)=>SetUpdatedtitle(e.target.value)}
              />
            </Form.Group>
            <div className='text-center'>
            <img src={updatedImage} className='img-responsive' height='150px' />
            <br />
            <button className='btn btn-dark mt-3' type='button' onClick={() => setChange(!change)}>
              {change ? "Cancel" : "Change image"}
            </button>
          </div>
          {change && (
            <div className='my-4 mt-4'>
              <label className='form-label' htmlFor='customFile'>
               <strong>Choose new image</strong>
              </label>
              <input type='file' className='form-control' id='customFile' onChange={(e)=>handleupdateimage(e)}/>
            </div>
          )}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label><strong>Content</strong></Form.Label>
              <Form.Control as="textarea" rows={3} placeholder='Content of your post'
              required={true}
              style={{ resize: 'none' }}
              value={updatedcontent}
             onChange={(e)=>Setupdatedcontent(e.target.value)}

              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={UpdatedClose}>
            Close
          </Button>
          <Button variant="dark"  onClick={() => updatenow(UpdatedClose)}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>

</div>

    </>
     );
}

export default Post;