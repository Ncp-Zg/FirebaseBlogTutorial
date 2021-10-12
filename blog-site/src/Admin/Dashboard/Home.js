import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const { posts, user_id } = useSelector((state) => ({
    posts: state.post.posts,
    user_id: state.auth.user_id,
  }),shallowEqual);

  const currentUserPosts = posts.filter(pst=>pst.postData.createdBy === user_id)

  return (
    <Container>
        {/* <Row style={{height:"250px"}}>
            <Col className="align-self-start">Add User</Col>
            <Col className="align-self-end">Dashboard</Col>
        </Row> */}

      <Row>
        <Col className=" d-flex justify-content-end mt-2">
          <Link to="/" className="btn btn-outline-primary me-2">
            Home
          </Link>
          <Link to="/admin/dashboard/addUser" className="btn btn-dark">
            Add User
          </Link>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={8} className="d-flex gap-2 mx-auto mt-5">
          <Card className="mx-auto p-4 border text-center col-md-4">
            <Card.Body>
              <Card.Title>Total Posts</Card.Title>
              <h1 className="display-1"> {posts.length} </h1>
            </Card.Body>
          </Card>
          <Card className="mx-auto p-4 border text-center col-md-4">
            <Card.Body>
              <Card.Title>My Posts</Card.Title>
              <h1 className="display-1"> {currentUserPosts.length} </h1>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
