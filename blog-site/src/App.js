import './App.css';
import {Switch,Route} from "react-router-dom"
import Admin from "./Admin"
import {ToastContainer} from "react-toastify"
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchPosts } from './redux/actionCreators/postActionCreators';
import SeePost from './Components/SeePost';
import NavbarComponent from './Components/Navbar/NavbarComponent';
import Home from './Components/HomePage/Home';
import SubNavbar from './Components/SubNavbar/SubNavbar';
import { auth } from './config/firebase';
import { loginUser } from './redux/actionCreators/AuthActionCreators';
import Posts from './Components/Posts/Posts';

function App() {

  console.log("app.js calıstı")

  const dispatch = useDispatch();

      const {isLoggedIn,isLoading} = useSelector(state => ({
        isLoggedIn: state.auth.isLoggedIn,
        isLoading: state.post.isLoading
    }),shallowEqual);

  useEffect(() => {
    if(isLoading){
      dispatch(fetchPosts())
    }
  }, [])
  

  useEffect(() => {
    auth.onAuthStateChanged(user=>{
  
        const data = {
            user: user.providerData[0],
            id:user.uid
        }

        dispatch(loginUser(data));


    })
    
}, [])

  return (
    <div className="App">

      <ToastContainer />
      <Switch>
        <Route exact path= "/" >
          {
            isLoggedIn && <SubNavbar/>
          }
          <NavbarComponent/>
          <Home/>
        </Route>
        <Route path= "/posts" >
          {
            isLoggedIn && <SubNavbar/>
          }
          <NavbarComponent/>
          <Posts/>
        </Route>
        <Route path="/post/:postId" component={()=><SeePost/>}/>

        <Route path="/admin" component={()=><Admin/>}>

        </Route>


      </Switch>
    </div>
  );
}

export default App;
