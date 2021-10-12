import React from "react";
import { Col, Container, Row, Image } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { removeComment } from "../redux/actionCreators/postActionCreators";
import CommentForm from "./CommentForm";
import ReplyForm from "./ReplyForm";
import ShowReplies from "./ShowReplies";

const SeePost = () => {
  const { postId } = useParams();
  console.log(postId);

  const dispatch = useDispatch();

  const { isLoading, posts, isLoggedIn, user_id } = useSelector(
    (state) => ({
      isLoading: state.post.isLoading,
      posts: state.post.posts,
      isLoggedIn: state.auth.isLoggedIn,
      user_id: state.auth.user_id,
    }),
    shallowEqual
  );

  const currentPost =
    posts.length > 0 && posts.find((pst) => pst.postId === postId);

    
  if (isLoading) {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center my-5 display-2">Loading Post.....</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  if (!isLoading && !currentPost) {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="text-center my-5 display-2">No Post Found</h1>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
      <Row>
        <Col md={12}>
          <Image
            style={{ height: "650px", width: "100%" }}
            src={currentPost.postData.image}
            alt={currentPost.postData.title}
          />
        </Col>
      </Row>
      <Row className="align-items-center justify-content-between">
        <Col md={6} className="py-5 px-5">
          <p className="display-3">{currentPost.postData.title}</p>
        </Col>
        <Col
          md={5}
          className="d-flex gap-2 pr-5 align-items-center justify-content-end"
        >
          {currentPost.postData.category.map((cat, index) => (
            <p
              className="py-1 bg-primary text-white px-2 me-3"
              key={index + 55}
            >
              {cat}
            </p>
          ))}
        </Col>
      </Row>



      
      <Row>

        <div
          className="col-md-6 col-sm-12"
          
        >
          <p style={{ wordWrap: "wrap", wordBreak: "break-word" }} className="m-3">
            {currentPost.postData.description}
          </p>
          
        </div>
        
          
        <div className="col-md-6 col-sm-12 ">

          <CommentForm currentPost={currentPost} />

          
          <div className="col-md-12 mt-5 px-3">
            {currentPost.postData.comments.map((comment, index) => (
              <div
                key={index + 12312}
                className="w-100 card border border-dark p-4 py-3 my-2"
              >
                <div className="w-100 d-flex align-items-center justify-content-between">
                  <div className="d-flex">
                    <p className="my-0 text-capitalize text-white bg-dark p-2 px-3 me-2 rounded-circle">
                      {comment.name[0]}
                    </p>
                    <div>
                      <p className="my-0 card-title">{comment.name}</p>
                      <p className="my-0 card-text small">{comment.email}</p>
                    </div>
                  </div>
                  <div className="d-flex gap-1 align-items-center justify-content-end">
                    {comment.admin && (
                      <p className="bg-dark text-white py-1 px-2 ms-3">Admin</p>
                    )}
                    {comment.postOwner && (
                      <p className="bg-dark text-white py-1 px-2">Author</p>
                    )}
                  </div>
                </div>
                <p className="mt-4">{comment.comment}</p>

                {/* replies */}

                <ShowReplies allReplies={comment.replies} />

                {/* reply form */}

                <ReplyForm
                  comment={comment}
                  currentPost={currentPost}
                  index={index}
                />

                {/* delete comment button */}
                {isLoggedIn && currentPost.postData.createdBy === user_id && (
                  <button className="btn btn-danger my-2 text-center"
                  onClick={()=>dispatch(removeComment(index,currentPost.postId,currentPost.postData.comments))}
                  >
                    Delete Comment
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        </Row>
 
    </Container>
  );
};

export default SeePost;
