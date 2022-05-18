import React from 'react'
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';


function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  console.log(user);

  const { email, password } = user;

  let navigate = useNavigate();

  const onChange = (e) => {
        setUser((prevState) => ({
             ...prevState,
             [e.target.name]: e.target.value 
        }))
  }
  const { loginWithRedirect } = useAuth0();
 

  const sendRequest = async() => {
    try{
      let res = await fetch("http://localhost:3000/login", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
      }),
  });
  let response = await res.json()
  return response;
    }
    catch(err){
      console.log(err);
    }
    
  }

  

   const  onSubmit = async (e) => {
      e.preventDefault();
      sendRequest().then(() => navigate('/dashboard'));
      
  }

  return (
    <>
    <Header />
    <section className="form" >
      <h2 className="text-center py-3">Login to Your Account</h2>
      <Form style={{width: '40%', margin: 'auto' }} onSubmit={onSubmit}>
        

        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control  name="email" value={email} onChange={onChange} type="email" placeholder="name@example.com" />   
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control   name="password" value={password} onChange={onChange} type="password" placeholder="Password" />
        </Form.Group>

    

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>

      <Button onClick={() => loginWithRedirect()}>Login</Button>

    </section>
    <Footer />
    </>
  );
}

export default Login


