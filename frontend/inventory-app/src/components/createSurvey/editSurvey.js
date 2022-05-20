import React from 'react'
import { useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Table, Container, Col, Row } from "react-bootstrap";

export function EditSurvey() {
    const [surveyId, setSurveyId] = useState(null);
    const [survey, setSurvey] = useState(null);
    const [displayedSurvey, setDisplayedSurvey] = useState(<div>Your Survey is loading...</div>)
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
    
        } catch (error) {
          console.log(error.error);
        }
      });
    

  return (
    <div>E</div>
  )
}

