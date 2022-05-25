import React from "react";
import "./header.css";
import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";
import { useAuth0 } from "@auth0/auth0-react";

export function Header(props) {
  const [userData, setUserData] = useState(null);
  const { loginWithRedirect, user } = useAuth0();
  const { logout } = useAuth0();

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
    <header>
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">SurveyMaker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/create-survey">Create a Survey</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            {user ? (
              <>
                <Navbar.Text>
                  {user.name} is logged in &nbsp; &nbsp; &nbsp; &nbsp;{" "}
                </Navbar.Text>
                <Nav.Link
                  onClick={() => logout({ returnTo: "http://localhost:3000/" })}
                >
                  Log Out
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={() => loginWithRedirect()}>
                <Person /> Sign In or Register
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
