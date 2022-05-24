import React from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';


export function SurveySubmit() {
    let navigate = useNavigate(); 
    let { id } = useParams();

  return (
   
<Card style={{margin: 'auto', width: '40%', marginTop: 20}}>
<Card.Header>Thank you for submitting your answers to this survey</Card.Header>
<Card.Body>
  
  <Card.Text>
  If you would like to submit another response, please click 
            the button below:
  </Card.Text>
  <Button variant="outline-info" onClick={()=> navigate(`/display-survey/${id}`)}>Submit Another Response</Button>
</Card.Body>
</Card>
  )
}

