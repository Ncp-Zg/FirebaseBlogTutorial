import React, { useEffect, useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { firestore } from "../../config/firebase";
import { doFav, doFavNum } from "../../redux/actionCreators/postActionCreators";

const PostCard = ({ pst, index }) => {
  const { isLoggedIn, user_id } = useSelector((state) => ({
    isLoggedIn: state.auth.isLoggedIn,
    user_id: state.auth.user_id,
  }));
  const history = useHistory();
  const dispatch = useDispatch();
  // const[num,setNum]=useState({like:0,likeowner:[]})
  const ref = useRef([])
  const reflike =useRef(pst.postData.likeNum)
  const handlefav=()=>{
    dispatch(doFavNum(!(pst.postData.like),pst.postId,reflike.current,pst,user_id,ref.current))
  }

  useEffect(()=>{
    firestore.collection("posts").doc(pst.postId).onSnapshot(snapshot=>{
            const prevData = []
            const data = {postData:snapshot.data()}
            prevData.push(...(data.postData.likeOwner))
            // setNum({like:data.postData.likeNum,likeowner:prevData})
            ref.current = data.postData.likeOwner
            reflike.current = data.postData.likeNum

    })
  },[reflike.current])




  return (
    <div>
      <Card className="mx-auto px-0 mb-3" key={index}>
          {/* {JSON.stringify(pst.postData.createdBy)} ,{user_id} */}
        <Card.Img src={pst.postData.image} alt={pst.postData.title}/>
        <Card.Body>
          <Card.Title>{pst.postData.title}</Card.Title>
          <Card.Subtitle>
            {pst.postData.description.slice(0, 120)}...
          </Card.Subtitle>
        </Card.Body>
        <Card.Footer className="bg-white">
        <div className="d-flex w-100 ps-2 py-2 align-items-center justify-content-between">
          
                  {(pst.postData.likeOwner.includes(user_id)) ? (
                    (user_id ? <MdFavorite 
                      onClick={() => {
                        handlefav(!(pst.postData.like),pst.postId,reflike.current,pst,user_id,ref.current)
                      }}
                      style={{ color: "red",fontSize:"30px" }}
                    /> : <MdFavorite style={{ color: "red", fontSize:"30px"}}/>)
                    
                  ) : (
                    (user_id? (<MdFavoriteBorder
                      onClick={() => {handlefav(!(pst.postData.like),pst.postId,reflike.current,pst,user_id,ref.current)}}
                      style={{ color: "red" ,fontSize:"30px"}}
                    />):(<MdFavorite style={{ color: "red" , fontSize:"30px"}}/>))
                    
                  )}
                  <p className="col align-self-start my-2 pt-1 fw-bold">{reflike.current}</p>

                  <p className="py-1 me-1 px-2 bg-dark text-white d-inline my-2 ">
                    {pst.postData.author}
                  </p>
                </div>
          <Button
            type="button"
            variant="primary"
            bg="primary"
            className="form-control my-2"
            onClick={() => history.push(`/post/${pst.postId}`)}
          >
            See Post
          </Button>
          {isLoggedIn && pst.postData.createdBy === user_id && (
            <Button
              type="button"
              variant="outline-primary"
              bg="primary"
              className=" form-control"
              onClick={() =>
                history.push(`/admin/dashboard/post/${pst.postId}/edit`)
              }
            >
              Edit Post
            </Button>
          )}
        </Card.Footer>
      </Card>
    </div>
  );
};

export default PostCard;
