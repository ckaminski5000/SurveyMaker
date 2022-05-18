import React from 'react'
import './header.css';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { Person } from 'react-bootstrap-icons';
import { useAuth0 } from "@auth0/auth0-react";


export function Header(props) {

  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();

  return (
    <header>
        <Navbar bg="primary" variant="dark">
    <Container>
    <Navbar.Brand href="#home">SurveyMaker</Navbar.Brand>
    <Nav className="me-auto">
        <Nav.Link href="#create">Create a Survey</Nav.Link>
          <Nav.Link href="#home">Dashboard</Nav.Link>

    </Nav>
    <Nav className='ml-auto'>
        
        {props.name 
        ? <Nav.Link>{props.name} is logged in </Nav.Link>
        : <Nav.Link onClick={() => loginWithRedirect()}>
        <Person /> Sign In
    </Nav.Link>}
        <Nav.Link onClick={() => logout({ returnTo:"http://localhost:3000/"})}>
            Log Out
        </Nav.Link>
    </Nav>
    </Container>
  </Navbar>
    </header>
  )
}

export default Header;