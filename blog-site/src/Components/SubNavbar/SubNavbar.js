import React from 'react'
import { Navbar,Nav,Button} from 'react-bootstrap'
import { NavLink , useHistory} from "react-router-dom"
import { useSelector,shallowEqual } from "react-redux"

const SubNavbar = () => {

    const history = useHistory()
    const {user} = useSelector(state => ({
        user: state.auth.user
    }),shallowEqual);

    return (
        <Navbar bg="light" variant = {"light"}>
            <Nav className="ms-auto me-1">
            <Nav.Item>
            <p className="h-100 my-0 me-3 mt-1">
                             Welcome,{" "} 
                             <span style={{fontWeight:"bold"}}> {user.displayName}</span>
                        </p>    
            </Nav.Item>
                        
                <Nav.Item>
                <Button type="button" variant= "success" size="sm" bg="success" onClick={()=>history.push("/admin/dashboard")}>Admin</Button>  
                </Nav.Item>        
            </Nav>    
        </Navbar>
    )
}

export default SubNavbar
