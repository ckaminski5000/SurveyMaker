import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth0 } from '@auth0/auth0-react';

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
  const [fakeSurvey, setFakeSurvey] = useState({
    _id: uniqid("survey-"),
    title: "Survey Title",
    description: "Survey Description",
    questions: [
      {
        type: "multiple choice",
        question: "What is your favorite color?",
        answer_choices: ["Pink", "purple", "blue", "other"],
        _id: "question-l394suzc",
        response: {
          response: "",
          time: "",
          _id: uniqid("response-"),
        },
      },
      {
        type: "short response",
        question: "Did you have a good day today?",
        answer_choices: [],
        _id: "question-l39650gv",
        response: {
          response: "",
          time: "",
          _id: uniqid("response-"),
        },
      },
      {
        type: "true/false",
        question: "Are you happy",
        answer_choices: ["True", "False"],
        _id: "question-l3965dyz",
        response: {
          response: "",
          time: "",
          _id: uniqid("response-"),
        },
      },
      {
        type: "paragraph",
        question: "What did you do today?",
        answer_choices: [],
        _id: "question-l392343dyz",
        response: {
          response: "",
          time: "",
          _id: uniqid("response-"),
        },
      },
    ],
    user_id: uniqid("user-"),
  });
  const [survey, setSurvey] = useState({});
  const { getAccessTokenSilently } = useAuth0();
  const [newForm, setNewForm] = useState(<div>Loading...</div>);

  
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

  const handleChange = (e, responseId, responseType) => {
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

  useEffect(() => {
    setSurvey({ ...survey, _id: props.surveyId })
      //callApi to get survey information from the database
      
        callApi(`/api/surveys/${props.surveyId}`, {
          method: "GET"
        });
      
    
  }, [props.surveyId]);



useEffect(() => {
  //display survey
  if(survey.title === undefined){
    setNewForm(<div>Loading...</div>)
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
      <Button>Submit Survey</Button>
    </div>
  );
}
