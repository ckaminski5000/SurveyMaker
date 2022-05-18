import React from 'react'
import {Container, Row, Col } from 'react-bootstrap';

export function Footer(props) {
  return (
    <footer>
        <Container>
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