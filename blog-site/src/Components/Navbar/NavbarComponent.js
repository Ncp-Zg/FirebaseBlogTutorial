import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

const NavbarComponent = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
      return (
    <Navbar bg="dark" variant={"dark"} className="shadow-lg">
      <Navbar.Brand
        as={NavLink}
        to="/admin/dashboard"
        className="ms-lg-5 ms-sm-2 ps-1">
        React Redux Simple Blog
      </Navbar.Brand>
      {!isLoggedIn ? (
          <Nav className="ms-auto me-2">
        <Nav.Item>
          <Nav.Link as={NavLink} exact to="/">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={NavLink} exact to="/posts" className="px-1">
            Posts
          </Nav.Link>
        </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} exact to="/admin/login">
              Login
            </Nav.Link>
          </Nav.Item>
      </Nav>
      ): (
        <Nav className="ms-auto me-2">
          <Nav.Item>
            <Nav.Link as={NavLink} exact to="/">
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} exact to="/posts">
              Posts
            </Nav.Link>
          </Nav.Item>
        </Nav>
      )}
          </Navbar>
  );

  
};

export default NavbarComponent;
