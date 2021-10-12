import React, { useState } from 'react'
import { useEffect } from 'react'

const ShowReplies = ({allReplies}) => {

    const [replies,setReplies] = useState(false)

    console.log(allReplies)

    return (
        <>
            {
                allReplies.length > 0 ? ( replies && (
                    <div className="w-100 my-4">
                        {
                  allReplies.map((reply,index)=>(
                    <div key={index+232} className="w-100 card border border-dark p-2 my-1">
                      <div className="w-100 d-flex align-items-center justify-content-between">
                        <div className="d-flex">
                          <p className="my-0 text-capitalize text-white bg-dark p-2 px-3 me-1 rounded-circle">
                          {reply.name[0]}
                          </p>
                          <div>
                          <p className="my-0 card-title">{reply.name}</p>
                          <p className="my-0 card-text small">{reply.email}</p>
                          </div>
                        </div>
                        <div className="d-flex gap-1 align-items-center justify-content-end">
                          {
                            reply.admin && (<p className="small bg-dark text-white py-1 px-1">Admin</p>)
                          }
                          {
                            reply.postOwner && (<p className="small bg-dark text-white py-1 px-1">Author</p>)
                          }

                        </div>

                        
                      </div>
                      <p className="mt-4">{reply.reply}</p>
                    </div> 
                  ))
                }
                        </div>
                )
                    
                ) : (
                    <div className="w-100 my-4">No Replies.</div>
                )
            }

            {allReplies.length > 0 && (
                <button className="btn text-primary mt-4" onClick={()=>setReplies((prevReply)=>!prevReply)}> {replies ? "Hide" : "View"} {allReplies.length} reply(s)</button>
            )}
            
        </>
    )
}

export default ShowReplies
