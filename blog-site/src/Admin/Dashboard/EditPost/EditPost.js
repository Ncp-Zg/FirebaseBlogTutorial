import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePostData } from "../../../redux/actionCreators/postActionCreators";

const EditPost = () => {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();


  const posts = useSelector((state) => state.post.posts);

  const currentPost = posts.find((pst) => pst.postId === postId);

  useEffect(() => {
    if (currentPost) {
      setTitle(currentPost.postData.title);
      setDescription(currentPost.postData.description);
    }
  }, [currentPost]);

  const handleSubmit = (e)=> {
      e.preventDefault();

      if (!title || !description) {
        return toast.warning("Please fill in all fields")
    }
    if (description.length < 100) {
        return toast.info("Description should be of atleast 100")
    }

    if (title.trim().split(" ").length < 2) {
        return toast.info("Title should be of atleast 2 words")
    }

    const data = { title, description}

    dispatch(updatePostData(postId,currentPost,data))
  }

  return (
    <Container>
      <Row>
        <h1 className="display-4 text-center mt-4">Edit Post {postId}</h1>
        <Col md={6} className="mx-auto mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Control
            className="mt-5 mb-3"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              rows = "10"
            />
            <Button type="submit" className="mt-4 form-control" variant ="dark">Update Post</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditPost;
