import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import PostCard from '../PostCard/PostCard';

const Posts = () => {

    const { postLoading, posts } = useSelector((state) => ({
        postLoading: state.post.isLoading,
        posts: state.post.posts,
      }));

    return (
        <Container>
      <Row>
        <Col md={12} className="mt-5 mb-4 border-bottom">
            <p className="py-3 px-3 text-center bg-dark text-white">
              All Post
            </p>
        </Col>
        
      </Row>
      <Row className="mt-2 mb-5">
          {postLoading ? (
            <h1 className="my-5 text-center">Loading...</h1>
          ) : (
            posts.map((pst,index)=>(
                <Col md={6}>
                <PostCard key={index} index={index} pst={pst} />
                </Col>
            ))
          )}
        </Row>
    </Container>
    )
}

export default Posts
