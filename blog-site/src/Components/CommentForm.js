import React, { useState } from "react";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { firestore } from "../config/firebase";
import { doComment } from "../redux/actionCreators/postActionCreators";

const CommentForm = ({ currentPost }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [prevCmt, setPrevCmt] = useState("");

  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  // useEffect(()=>{dispatch(doComment()); console.log("yenılendi")},[currentPost.postData.comments.length])
  console.log(currentPost.postData.comments.length);

  useEffect(() => {
    firestore
      .collection("posts")
      .doc(currentPost.postId)
      .onSnapshot((snapshot) => {
        console.log(snapshot.data().comments);
        const prevComments = [];
        const data = { postData: snapshot.data() };
        prevComments.push(data.postData.comments);
        setPrevCmt(prevComments);
      });
  }, [currentPost.comments]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoggedIn) {
      if (!comment) return toast.dark("please add comment!");

      const data = {
        admin: isLoggedIn,
        postOwner: currentPost.postData.createdBy === user.user_id,
        comment,
        email: user.user.email,
        name: user.user.displayName,
        replies: [],
        userId: user.user_id,
      };
      dispatch(doComment(data, currentPost.postId, prevCmt));
      setComment("");
      console.log(data);
    } else {
      if (!comment || !name || !email)
        return toast.dark("please fill in all fields!");

      const data = {
        admin: isLoggedIn,
        comment,
        email,
        name,
        postOwner: false,
        replies: [],
        userId: null,
      };
      console.log(data);
      dispatch(
        doComment(data, currentPost.postId, prevCmt)
      );
      setComment("");
      setEmail("");
      setName("");
    }
  };

  return (
    <form className="w-100 px-3" onSubmit={handleSubmit}>
      {isLoggedIn ? (
        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>
        </div>
      ) : (
        <>
          <div className="form-group d-flex mb-2 gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
        </>
      )}
      <div className="form-group d-flex mb-2 gap-2">
        <input
          type="submit"
          className="form-control btn btn-primary"
          value="Add Comment"
        />
      </div>
    </form>
  );
};

export default CommentForm;
