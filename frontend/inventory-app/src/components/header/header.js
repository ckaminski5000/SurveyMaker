import React from "react";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import {logoutUrl} from '../../variables/constants';

export function Header(props) {
  const [userData, setUserData] = useState(null);
  const { loginWithRedirect, user } = useAuth0();
  const { logout, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (userData) {
      return;
    } else {
      if(user){
        setUserData({ name: user.name, _id: user.sub });
      }
    }
  }, [userData]);

  return (
    <header style={{height: '40'}}>
      <Navbar bg="primary" variant="dark" expand="lg">
      

        <Container>
          <Navbar.Brand href={isAuthenticated ? "/dashboard": '/'}>
          <img
          alt=""
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
            SurveyMaker
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
          
          
          
         {user && ( <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/create-survey">Create a Survey</Nav.Link>
          </Nav>)}
          <Nav className="me-auto my-2 my-lg-0"
        style={{ maxHeight: '100px' }}
        navbarScroll>
         
            
          </Nav>
          {user ? (
              <>
                <Navbar.Text>
                  {user.name} is logged in &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                </Navbar.Text>
                <button className="headerLink"
                  onClick={() => logout({ returnTo: logoutUrl })}
                >
                  Log Out
                </button>
              </>
            ) : (
              <button className="headerLink" onClick={() => loginWithRedirect()}>
                <Person /> Sign In or Register
              </button>
            )}
          
          </Navbar.Collapse>
         
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
