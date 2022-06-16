import React from 'react'
import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import surveyImg from '../images/surveyMakerImg.png';
import surveyResultsImg from '../images/surveyMakerResultsImg.png';


export function Splash() {
  const { loginWithRedirect, isAuthenticated} = useAuth0();
  const navigate = useNavigate();

  if(isAuthenticated){
    navigate('/dashboard');
  }

  
  return (
    <main className='main' style={{ backgroundColor: 'aliceblue'}}>
    <Container  fluid>
      <Row>
        <Col  xs={12} md={6} lg={6} className="justify-content-md-center"  style={{paddingTop: 80, paddingBottom: 50, textAlign: 'right', paddingRight: 40 }}>
            <h2 style={{fontWeight: 500}}>Get Customer Insights! Increase Sales!</h2><br />
            <h4>Make surveys to get customer insights that will drive future sales!</h4><br />
            <Button onClick={() => loginWithRedirect()} variant="success" style={{fontSize: 20}}>Get Started Now!</Button>
        </Col>
        <Col xs={12}  md={6} lg={6} className="justify-content-md-center" style={{paddingTop: 40, paddingBottom: 50 }}>
            <div style={{display: 'flex', justifyContent: 'center'}}><img  src={surveyImg} className="splashImg"></img></div>
        </Col>
      </Row>
      <Row className='splashSection'>
      
        <Col sm={12} md={12}  style={{paddingTop: 80,}}>
            <h2 style={{fontWeight: 500, textAlign: 'center'}}>See Your Results in Real Time!</h2>
        </Col>
        

      </Row>
      <Row className='splashSection'>
      <Col sm={12} md={12} style={{paddingBottom: 30, margin: 10}}>
            
            <div style={{display: 'flex', justifyContent: 'center'}}><img style={{maxWidth: "700px"}}  src={surveyResultsImg} className="splashImg"></img></div>
        </Col>

      </Row>
    </Container>
    </main>
  );
}



