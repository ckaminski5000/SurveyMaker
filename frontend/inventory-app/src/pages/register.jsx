import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [user, setUser] = useState({
     name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [isError, setIsError] = useState(false);

  let navigate = useNavigate();

  const onChange = (e) => {
        setUser((prevState) => ({
             ...prevState,
             [e.target.name]: e.target.value 
        }))
  }


  const sendRequest = async() => {
    try{
      let res = await fetch("http://localhost:5000/users/create", {
        headers: {
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: user.password,
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
    <section className="form" >
      <h2 className="text-center py-3">Register an Account</h2>
      <h5 className="text-center">Please create an account</h5>
      <Form style={{width: '40%', margin: 'auto' }} onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control  name="name" value={user.name} onChange={onChange} type="text" placeholder="Please enter your name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control  name="email" value={user.email} onChange={onChange} type="email" placeholder="name@example.com" />   
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control   name="password" value={user.password} onChange={onChange} type="password" placeholder="Password" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="Password2">
          <Form.Label>Confirm your password</Form.Label>
          <Form.Control  name="password2" value={user.password2} onChange={onChange} type="password" placeholder="Password Confirmation" />
        </Form.Group>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  );
}

export default Register;
