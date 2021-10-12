import React, { useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { doReply } from '../redux/actionCreators/postActionCreators';

const ReplyForm = ({comment, currentPost,index}) => {

    const [openReplyForm,setOpenReplyForm]=useState(false);
    const dispatch = useDispatch();

    const [name,setName]=useState("")
    const [email,setEmail]=useState("")

    const [reply,setReply] =useState("");

    const {isLoggedIn,user} = useSelector(state => ({
        isLoggedIn: state.auth.isLoggedIn,
        user: state.auth
    }),shallowEqual);

    const handleSubmit = (e)=>{
        e.preventDefault();
        
        if(isLoggedIn){
            if(!comment) return toast.dark("please add comment!");

            const data = {
                admin:isLoggedIn,
                postOwner:currentPost.postData.createdBy === user.user_id,
                reply,
                email:user.user.email,
                name: user.user.displayName,
                replies:[],
                userId: user.user_id
            }
            dispatch(doReply(data,currentPost.postId,currentPost.postData.comments,index))
            setEmail("");
            setName("");
            setReply("");
        }else{

            if(!comment || !name || !email) return toast.dark("please fill in all fields!");

           const data = {
                admin:isLoggedIn,
                reply,
                email,
                name,
                postOwner:false,
                replies:[],
                userId: null,
            }
            console.log(data)
            dispatch(doReply(data,currentPost.postId,currentPost.postData.comments,index))
            setEmail("");
            setName("");
            setReply("");
        }
        
    }

    return (
        <>

        {openReplyForm ?
        
        isLoggedIn ? 
        <form onSubmit={handleSubmit}>
        <div className="form-group mb-2">
        <textarea placeholder="Do reply.." className="form-control" value={reply} onChange={(e)=>setReply(e.target.value)}></textarea>
        <button type="submit" className="btn text-primary text-start mt-5">Reply</button>
        <button onClick={()=>setOpenReplyForm(false)} className="btn text-danger text-start mt-5">Cancel</button>
    </div>
    </form>
    : (<form onSubmit={handleSubmit}>
        <div className="form-group d-flex mb-2 gap-2">
        <input type="text" className="form-control" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input type="email" className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
    </div>
        <div className="form-group mb-2">
        <textarea placeholder="Do reply.." className="form-control" value={reply} onChange={(e)=>setReply(e.target.value)}></textarea>
        <button type="submit" className="btn text-primary text-start mt-5">Reply</button>
        <button onClick={()=>setOpenReplyForm(false)} className="btn text-danger text-start mt-5">Cancel</button>
    </div>
    </form>)
    
        :
        <p style={{cursor:"pointer"}} onClick={()=>setOpenReplyForm(true)} className="btn text-primary text-start mt-5">Reply</p>
        }
            
        </>
    )
}

export default ReplyForm
