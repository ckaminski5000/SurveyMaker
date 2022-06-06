import React from 'react'
import {Container, Row, Col } from 'react-bootstrap';

export function Footer(props) {
  return (
    <footer className='footer' style={{height: '10%', backgroundColor: '#008cba', color: 'white',}} fluid>
        <Container fluid>
            <Row>
                <Col className='text-center py-2'>
                    Copyright &copy; Ckaminski Labs
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer;