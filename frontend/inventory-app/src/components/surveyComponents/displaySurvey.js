import React from "react";
import { Button, Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate,  useParams } from "react-router-dom";
import {serverUrl} from "../../variables/constants.js";


import uniqid from "uniqid";
import {
  SurveyTitle,
  Paragraph,
  ShortResponse,
  MultipleChoice,
  TrueFalse,
} from "./displayQuestionComponents";
import { useCallApi } from "../../hooks/useApi";

export function DisplaySurvey(props) {
  
  const [survey, setSurvey] = useState({});
  const { getAccessTokenSilently } = useAuth0();
  const [newForm, setNewForm] = useState(<div style={{textAlign: 'center', padding: 20}}><Spinner animation="border" /></div>);
  let navigate = useNavigate(); 
  let { id } = useParams();

  
  const callApi = useCallback(async (url, fetchOptions) => {
    
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, ...fetchOptions
      });

      const responseData = await response.json();

      //add blank responses to each question
      let questions = [];
      
      //reformat questions from the database
      responseData.questions.forEach((question) => {
            let newQuestion = {
                            _id: question._id,
                            type: question.type,
                            question: question.question,
                            answer_choices: question.answer_choices,
                            response: {
                               response: "",
                                time: "",
                                _id: uniqid("response-"),
                           }
            }
            questions.push(newQuestion);
      });

      let updatedSurvey = {
        _id: responseData._id,
        questions: questions,
        title: responseData.title,
        description: responseData.description,
        user_id: responseData.user_id,
        creationTime: responseData.creationTime
      }

      setSurvey(updatedSurvey);


    } catch (error) {
      console.log(error.error);
    }
  });

  const handleChange = (e, responseId, responseType, answerValue) => {
    let surveyObject = { ...survey };
    let index = surveyObject.questions.findIndex(
      (question) => question.response._id === responseId
    );
    
      surveyObject.questions[index].response = {
        ...surveyObject.questions[index].response,
        response: e.target.value,
        time: new Date(),
      };
      setSurvey(surveyObject);
    
    
    
  };

  const submitSurvey = async (e) => {
    e.preventDefault();

    //api call to save the responses to the database
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}/api/surveys/update-responses/${survey._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }, 
          method: 'PUT',
          body: JSON.stringify({
              questions: survey.questions,
              _id: survey._id
          })
      });
      //if successful, direct user to a confirmation page that the survey has been submitted
      navigate(`/display-survey/submit-survey/${id}`)

    } catch (error) {
      console.log(error.error);
    }
  }

  useEffect(() => {
    setSurvey({ ...survey, _id: id })
      //callApi to get survey information from the database
      
        callApi(`/api/surveys/${id}`, {
          method: "GET"
        });
      
    
  }, []);



useEffect(() => {
  //display survey
  if(survey.title === undefined){
    setNewForm(<div style={{textAlign: 'center', padding: 20}}><Spinner animation="border" /></div>)
  }
  else{
    let form = survey.questions.map((question, index) => {
      switch (question.type) {
        case "short response":
          return (
            <ShortResponse
              key={question._id}
              question={question}
              index={index}
              onChange={handleChange}
              responseId={question.response._id}
            />
          );
        case "multiple choice":
          return (
            <MultipleChoice
              key={question._id}
              question={question}
              index={index}
              onChange={handleChange}
              responseId={question.response._id}
            />
          );
        case "true/false":
          return (
            <MultipleChoice
              key={question._id}
              question={question}
              index={index}
              onChange={handleChange}
              responseId={question.response._id}
            />
          );
        case "paragraph":
          return (
            <Paragraph
              key={question._id}
              question={question}
              index={index}
              onChange={handleChange}
              responseId={question.response._id}
            />
          );
        default:
          return null;
      
      }
      
    })
    setNewForm(form);
  }
  
}, [survey])



  

  

  return (
    <div className="displaySurvey">
      <SurveyTitle survey={survey} />
      {newForm}
      <Button onClick={submitSurvey}>Submit Survey</Button>
    </div>
  );
}
