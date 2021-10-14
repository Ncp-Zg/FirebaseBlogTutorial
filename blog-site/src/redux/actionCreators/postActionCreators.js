import { toast } from "react-toastify";
import { firestore, storage } from "../../config/firebase";
import * as types from "../types/postTypes"


//actions

const setLoading = data =>({
    type:types.SET_LOADING,
    payload:data
});

const addPost = data =>({
    type:types.ADD_POST,
    payload:data
});


const getPosts = (data) =>({
    type: types.SET_POSTS,
    payload: data,
});

const resetPosts = ()=> ({
    type:types.RESET_POSTS
})

const addComment = (data)=>({
    type:types.ADD_COMMENT,
    payload:data
})


const addReply = (data)=>({
    type:types.ADD_REPLY,
    payload:data
})


const deleteComment = (data)=>({
    type:types.DELETE_COMMENT,
    payload:data
})

const updatePost = (data) => ({
    type: types.UPDATE_POST,
    payload:data
})

const deletePost = (data) => ({
    type: types.DELETE_POST,
    payload:data
})

const setFavNum = (data)=>({
    type: types.SET_FAV_NUM,
    payload: data
})

//action creators

export const doPost = (data,image,setProgress) =>dispatch=>{

    firestore.collection("posts").add(data).then(async res=>{
        const document = await res.get()
        const postData = {postData: document.data(), postId:document.id};
        const uploadRef = storage.ref(`posts/${document.id}`);

        uploadRef.put(image).on("state_change",(snapshot)=>{
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);

            setProgress(progress)
        }, (err)=>{
            console.log(err)
        },async ()=>{
            const url = await uploadRef.getDownloadURL();
            firestore.collection("posts").doc(document.id).update({
                image:url
            }).then(()=>{
                postData.postData.image = url;
                console.log("post ekledi")
                dispatch(addPost(postData));
                toast.success("Post created successfully!!")
                // setInterval(()=>window.location.reload(),3000)
                
            }).catch(err=>{
                console.log(err)
            })
        })
    }).catch(err=>{
        console.log(err)
    })
    
    


//add the post and pass the callback
//dispatch(setLoading(true));

};

export const fetchPosts = ()=> dispatch =>{
    dispatch(setLoading(true));

    firestore.collection("posts").get().then(posts=>{

        const allPosts = [];

        posts.forEach((post)=>{
            const data = { postData:post.data(),postId:post.id};
            allPosts.push(data);
        });

        console.log(allPosts.length)
        dispatch(getPosts(allPosts));
        dispatch(setLoading(false))

    }).catch(err=>{
        console.log(err);
        toast.error(err);
    })
}


//Update Post

export const updatePostData = (postId,prevPost,data)=> dispatch => {

    const {title,description} = data;

    prevPost.postData.title = title;
    prevPost.postData.description = description;

    firestore.collection("posts").doc(postId).update({
        title,description
    }).then(()=>{
        dispatch(updatePost({postId,updatedPost:prevPost}))
        toast.success("successfully updated the post")
    }).catch(err=>{
        console.log(err)
        toast.error("somethıng went wrong!!")
    }
        
    )


}


//delete post

export const removePost = (postId, imgUrl) => dispatch => {
    //delete post and image logic

    storage.refFromURL(imgUrl).delete().then(()=>{
        firestore.collection("posts").doc(postId).delete().then(()=>{
            dispatch(deletePost({postId}))
            toast.success("successfully deleted the post")
        })


        
    }).catch(err => {toast.error("Something went wrong"); console.log(err)})
}


// for Comments

// export const doComment = (comment,postId)=> dispatch => {

//     //update the data in firebase
    
//    firestore.collection("posts").doc(postId).get().then((cmt)=>{
//         const prevComments = []
//         const data = {postData:cmt.data()};
//         prevComments.push(data.postData.comments)
//     const oldComments = [...prevComments[0]]
//     console.log(oldComments)
//         const newComments=[...oldComments,comment]
//     firestore.collection("posts").doc(postId).update({
//         comments:[...oldComments,comment]
//     }).then(()=>{
// //dispatch the data to redux
//         dispatch(addComment({postId,newComments}))
//         toast.success("comment added successfully!")
//         // setInterval(()=>window.location.reload(),200)
//     })
    
//     }).catch(err=>toast.error(err))
    

// }



export const doComment = (comment,postId,prevComments)=> dispatch => {

    //update the data in firebase
    const newComments = [...prevComments[0],comment]
   firestore.collection("posts").doc(postId).update({
       comments:[...prevComments[0],comment]
   }).then(()=>{
           dispatch(addComment({postId,newComments}))
           toast.success("comment added successfully!")
       })

}






export const removeComment = (index,postId,prevComments)=> dispatch => {

    //update the data in firebase
    const filteredComments = prevComments.filter((cmt,id)=>id !== index);
    console.log(filteredComments)

    firestore.collection("posts").doc(postId).update({
        comments:filteredComments,
    }).then(()=>{
//dispatch the data to redux
        dispatch(deleteComment({index,postId}))

        toast.success("comment deleted successfully!")
    }).catch(err=>toast.error(err))
    

}


// For Replies

export const doReply =(reply,postId,prevComments,index) => (dispatch)=>{
    // update the data in firebase

    const oldComments = prevComments;
    const replies = oldComments[index].replies;
    replies.push(reply);
    oldComments[index].replies=replies;
    
    firestore.collection("posts").doc(postId).update({
        comments:oldComments
    }).then(()=>{
        toast.success("reply added successfully");
        dispatch(addReply({oldComments,postId}))
        setInterval(()=>window.location.reload(),200)
    })
}


export const doFavNum = (data,postId,num,pst,userId,likeOwn)=> dispatch=>{

    if(!(likeOwn.includes(userId))){
pst.postData.likeNum =num+1
            firestore.collection("posts").doc(postId).update({
                likeOwner:[...likeOwn,userId]
            })
    }else{
       
            pst.postData.likeNum =num-1
            firestore.collection("posts").doc(postId).update({
                likeOwner:likeOwn.filter(id=>id!==userId)
            })
        
    }

        firestore.collection("posts").doc(postId).update({
            likeNum:pst.postData.likeNum
        }).then(()=>{
            dispatch(setFavNum({data,postId,num,userId,likeOwn}))
        })
      

    
}