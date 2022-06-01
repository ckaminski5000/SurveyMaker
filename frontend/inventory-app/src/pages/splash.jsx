import React from 'react'
import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import surveyImg from '../images/surveyMakerImg.png';


export function Splash() {
  const { loginWithRedirect} = useAuth0();

  
  return (
    <main style={{height: '80vh', backgroundColor: 'aliceblue'}}>
    <Container  fluid>
      <Row>
        <Col sm={12} md={3}></Col>
        <Col sm={12} md={3}  style={{paddingTop: 80, paddingBottom: 50, }}>
            <h2 style={{fontWeight: 500}}>Get Customer Insights! Increase Sales!</h2><br />
            <h4>Make surveys to get customer insights that will drive future sales!</h4><br />
            <Button onClick={() => loginWithRedirect()} variant="success" style={{fontSize: 20}}>Get Started Now!</Button>
        </Col>
        <Col sm={12} md={3} style={{paddingTop: 10, paddingBottom: 30, margin: 50 }}>
            <Image fluid src={surveyImg} className="splashImg"></Image>
        </Col>
        <Col sm={12} md={3}></Col>
      </Row>
    </Container>
    </main>
  );
}



