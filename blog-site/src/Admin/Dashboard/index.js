import { auth } from "../../config/firebase"
import { logoutUser } from "../../redux/actionCreators/AuthActionCreators"
import {useDispatch} from "react-redux"
import React from 'react'
import {Link, Switch, Route, useRouteMatch, useHistory} from "react-router-dom"
import Register from "../Auth/Register/Register"
import NavbarComponent from "./Navbar/NavbarComponent"
import AddPost from "./AddPost/AddPost"
import AllPosts from "./AllPosts/AllPosts"
import EditPost from "./EditPost/EditPost"
import Home from "./Home"


function Dashboard() {
    
    const {path} =useRouteMatch()


    return (
        <>
        {!path.includes("addUser") && <NavbarComponent/>}
        <Switch>
            
            <Route exact path= {path} component={()=><Home/>}/>

            <Route path ={`${path}/addPost`} component = {()=><AddPost/>} />
            <Route path ={`${path}/posts`} component = {()=>< AllPosts />} />
            <Route path ={`${path}/addUser`} component = {()=><Register/>} />
            <Route path ={`${path}/post/:postId/edit`} component = {()=><EditPost/>} />
            
        </Switch>
        </>
    )
}

export default Dashboard
