import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate,  useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import { ShortResponseResults, MultipleChoiceResults } from './displayResultsComponents';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';


export function DisplayResults() {
  let navigate = useNavigate(); 
  let { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [results, setResults] = useState(<div><ThreeDots /></div>)
  const { getAccessTokenSilently } = useAuth0();



  const callApi = useCallback(async (url, fetchOptions) => {
    
    const serverUrl = 'http://localhost:5000';
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, ...fetchOptions
      });

      const responseData = await response.json();

      setSurvey(responseData);
      console.log(survey);


    } catch (error) {
      console.log(error.error);
    }
  });

  useEffect(() => {
    
        callApi(`/api/surveys/${id}`, {
          method: "GET"
        });
      
  }, [id]);

  useEffect(()=> {
    if(survey){
      const updatedResults = survey.questions.map((question, index) => {
        if(question.type === 'multiple choice' || question.type === 'true/false'){
          return <MultipleChoiceResults question={question} index={index + 1} key={question._id} />
        }
        else{
            return <ShortResponseResults question={question} index={index + 1} key={question._id} />
        }

     
    })
    setResults(updatedResults);
  }
  
  }, [survey])
  


  return (
    <div>
      <h2>Survey Results for</h2>
      <h4>{survey ? survey.title: null}</h4>
      <Container>
          {results}
      </Container>
    </div>
  )
}

