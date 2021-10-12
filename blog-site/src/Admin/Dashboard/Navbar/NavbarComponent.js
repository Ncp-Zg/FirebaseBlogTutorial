import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/actionCreators/AuthActionCreators";
import { auth } from "../../../config/firebase";

const NavbarComponent = () => {
  const dispatch = useDispatch();

  const logout = () => {
    auth.signOut();
    dispatch(logoutUser());
  };

  const { isLoggedIn, user } = useSelector(
    (state) => ({
      isLoggedIn: state.auth.isLoggedIn,
      user: state.auth.user,
    }),
    shallowEqual
  );

  return (
    <Navbar bg="dark" variant={"dark"} >
      <Navbar.Brand
        as={NavLink}
        to="/admin/dashboard"
        className="ms-md-2 ms-sm-2 me-0 text-success"
      >
        Admin Panel
      </Navbar.Brand>
      <Nav >
        <Nav.Item className="m-0" >
          <Nav.Link as={NavLink} to="/admin/dashboard" className=" p-1 ps-2 py-2">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item >
          <Nav.Link as={NavLink} to="/admin/dashboard/addPost" className="py-2 px-1">
            Add Post
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="m-0">
          <Nav.Link as={NavLink} to="/admin/dashboard/posts" className="p-1 py-2">
            Posts
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <div
        className="col-md-3 d-flex align-items-center justify-content-end"
        style={{ marginLeft: "auto", marginRight: "5%" }}
      >
        {isLoggedIn && (
          <>
            <p className="text-white h-100 my-0 p-1">
              Welcome,{" "}
              <span style={{ fontWeight: "bold" }} className="text-warning"> {user.displayName}</span>
            </p>

            <Button
              type="button"
              variant="success"
              size="sm"
              bg="success"
              style={{padding:"0.5px"}}
              onClick={() => {
                logout();
              }}
            >
              LogOut
            </Button>
          </>
        )}
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
