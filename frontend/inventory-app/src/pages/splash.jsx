import React from 'react'
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";


export function Splash() {
  
  return (
    <>
    <h1>This is the spash page.</h1>
    <p>Click the link above to login or register.</p>
    </>
  );
}



