import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import PostCard from "../PostCard/PostCard";

const Home = () => {
  const { postLoading, posts } = useSelector((state) => ({
    postLoading: state.post.isLoading,
    posts: state.post.posts,
  }));
  return (
    <Container>
      <Row className="gap-2">
        <Col md={6} className="mt-5 mb-4 border-bottom">
            <p className="py-3 px-3 text-center bg-dark text-white">
              Latest Post
            </p>
        </Col>
        <Col md={6} className="mt-2 mb-5">
          {postLoading ? (
            <h1 className="my-5 text-center">Loading...</h1>
          ) : (
            posts.slice(0,5).map((pst,index)=>(
                <PostCard key={index} index={index} pst={pst} />
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
