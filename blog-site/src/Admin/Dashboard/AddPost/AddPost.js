import React,{useState} from 'react'
import { Row, Container,Col,Button, Form , ProgressBar} from "react-bootstrap"
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import {useSelector,useDispatch, shallowEqual} from "react-redux"
import { doPost } from '../../../redux/actionCreators/postActionCreators';

const AddPost = () => {

    const [title,setTitle] = useState("");
    const [category,setCategory] = useState("");
    const [description,setDescription] = useState("");
    const [image,setImage] = useState("");
    const [progress,setProgress] = useState(0);

    const {user,userId} = useSelector(state => ({user:state.auth.user,userId:state.auth.user_id}),shallowEqual)
    const dispatch= useDispatch();


    const handleSubmit = (e)=>{
        
        e.preventDefault();

        

        if (!title || !category || !description) {
            return toast.warning("Please fill in all fields")
        }

        if (!image || !image === undefined) {
            return toast.warning("Please select an image")
        }

        if (description.length < 100) {
            return toast.info("Description should be of atleast 100")
        }

        if (title.trim().split(" ").length < 2) {
            return toast.info("Title should be of atleast 2 words")
        }

        if (image.size > 5242880) {
            return toast.info("Image should be less than or equal to 5 MB")
        }


        const data = {
            title:title,
            author:user.displayName,
            category: category.split(","),
            createdDate:new Date(),
            description:description,
            image:"",
            comments:[],
            createdBy:userId,
            like:false,
            likeNum:0,
            likeOwner:[]
        }
        dispatch(doPost(data,image,setProgress))
    }

    return (
        <Container>
         <Row>
        <Col md={12} style={{ textAlign :"right"}} className="my-5">
          <Button as={Link} to="/admin/dashboard" className="mr-2" bg="dark" variant="dark">
            Go Back
          </Button>
        </Col>
        <Col md={12} className="mb-3">
          <h1 className="display-3 text-dark text-center">Add Post</h1>
          <Col md={6} className="mx-auto shadow">
              {
                  progress > 0 && progress < 100 ?  <>

                    <h1>Uploading Post {progress} %</h1>
                    <ProgressBar now={progress} max ={100}/>
                  </>
                  : progress === 100 ? <>
                  
                  <h1>Post uploaded successfully</h1>

                  </>:
              
              <Form onSubmit={handleSubmit} className="p-4">
                  <Form.Group controlId="name">
                      <Form.Control type="text" name="title" placeholder="Title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="categories">
                      <Form.Control type="text" name="categories" placeholder="Categories [followed with commas for multiple]" value={category} onChange={(e)=>setCategory(e.target.value)}/>
                  </Form.Group>
                  <Form.Group controlId="desc">
                      <textarea placeholder="Enter the description" name="desc" className="form-control" rows="5" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                  </Form.Group>
                  <Form.Group controlId="file" className="my-2" >
                      <Form.Control type="file" name="image" onChange={(e)=>setImage(e.target.files[0])}/>
                  </Form.Group>
                  <Form.Group controlId="btn" className="my-2">
                      <Button type="submit" variant="dark" bg="dark" className="form-control">Add Post</Button>
                  </Form.Group>
              </Form>
}
          </Col>
        </Col>
        </Row>
      </Container>
    )
}

export default AddPost
