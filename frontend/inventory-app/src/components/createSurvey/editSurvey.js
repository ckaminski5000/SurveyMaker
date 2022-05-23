import React from 'react'
import { useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Table, Container, Col, Row } from "react-bootstrap";
import {
    MultipleChoice,
    Paragraph,
    ShortResponse,
    TrueFalse,
    SurveyTitle
  } from "./createQuestionComponents";

export function EditSurvey() {
    const [surveyId, setSurveyId] = useState(null);
    const [survey, setSurvey] = useState(null);
    const [displayedSurvey, setDisplayedSurvey] = useState(<div>Your Survey is loading...</div>)
    const { getAccessTokenSilently } = useAuth0();

    const startSurvey = () => {
        setDisplay("CreateSurvey");
        setSurvey({ ...survey, _id: uniqid('survey-'), user_id: props.id});
      };
    
      const handleSurveyChange = (e) => {
          let surveyObject = {
              ...survey,
            }
         surveyObject[e.target.name] = e.target.value;
            setSurvey(surveyObject);
      }
    
      const handleQuestionChange = (e) => {
        let questionArray = [...questions];
        let questionIndex = questionArray.findIndex(
          (question) => e.target.id === question._id
        );
        if (e.target.getAttribute("answer") === "yes") {
          let answerChoices = questionArray[questionIndex].answer_choices;
          //change answer choice based on index of item in array
          answerChoices[e.target.getAttribute("answernum")] = e.target.value;
    
          questionArray[questionIndex] = {
            ...questionArray[questionIndex],
            answer_choices: answerChoices,
          };
          setQuestions(questionArray);
        } else {
          questionArray[questionIndex] = {
            ...questionArray[questionIndex],
            question: e.target.value,
          };
          setQuestions(questionArray);
        }
      };
    
      const addMoreAnswerChoices = (e, id) => {
        let questionArray = [...questions];
        let questionIndex = questionArray.findIndex(
          (question) => (id === question._id)
        );
        let answerChoices = questionArray[questionIndex].answer_choices;
        answerChoices.push("");
        questionArray[questionIndex] = {
          ...questionArray[questionIndex],
          answer_choices: answerChoices,
        };
        setQuestions(questionArray);
      };
    
      const addQuestion = (e) => {
        setShowAddQuestionBtn(true);
        //then add new question to array
        if (e.target.value === "1") {
          let questionArray = [...questions];
          questionArray.push({
            type: "short response",
            question: "",
            answer_choices: [],
            _id: uniqid("question-"),
            responses: [],
          });
          setQuestions(questionArray);
        } else if (e.target.value === "2") {
          let questionArray = [...questions];
          questionArray.push({
            type: "multiple choice",
            question: "",
            answer_choices: ["", ""],
            _id: uniqid("question-"),
            responses: [],
          });
    
          setQuestions(questionArray);
        } else if (e.target.value === "3") {
          let questionArray = [...questions];
          questionArray.push({
            type: "true/false",
            question: "",
            answer_choices: ["True", "False"],
            _id: uniqid("question-"),
            responses: [],
          });
    
          setQuestions(questionArray);
        } else if (e.target.value === "4") {
          let questionArray = [...questions];
          questionArray.push({
            type: "paragraph",
            question: "",
            answer_choices: [],
            _id: uniqid("question-"),
            responses: [],
          });
    
          setQuestions(questionArray);
        }
      };
    
      const deleteQuestion = (e, id) => {
          let questionArray = [...questions];
          const questionIndex = questionArray.findIndex((question) => id === question._id)
          questionArray.splice(questionIndex, 1);
          setQuestions(questionArray);
      }
    
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
          return responseData;
        } catch (error) {
          console.log(error.error);
        }
      });
    
    
      const onSubmitSurvey = (e) => {
        e.preventDefault();
          
          //send survey to database
    
          callApi('/api/surveys/create', {
                                method: 'POST',
                                body: JSON.stringify({
                                    questions: questions,
                                    title: survey.title,
                                    description: survey.description,
                                    user_id: survey.user_id,
                                    creationTime: new Date(),
                                    survey_id: survey._id
                                }),
                                
          })
    
          //send id of survey to user in database
          callApi(`/users/updateSurveys/${survey.user_id}`, {
            method: 'PUT',
            body: JSON.stringify({
                survey_id: survey._id
            }),
            
    })
    
          //direct user to see a preview of their survey on displaysurvey page
          //also send current survey id to dashboard
          props.switchView('displaySurvey');
          props.sendSurveyId(survey._id);
      };
    
      const makeSurvey = () => {
        const form = questions.map((question, index) => {
          console.log(question.type);
          switch (question.type) {
            case "short response":
              return (
                <ShortResponse
                  key={question._id}
                  question={question}
                  onChange={handleQuestionChange}
                  deleteQuestion={deleteQuestion}
                  index={index}
                />
              );
            case "multiple choice":
              return (
                <MultipleChoice
                  key={question._id}
                  question={question}
                  onChange={handleQuestionChange}
                  addAnswerChoice={addMoreAnswerChoices}
                  deleteQuestion={deleteQuestion}
                  index={index}
                />
              );
            case "true/false":
              return (
                <TrueFalse
                  key={question._id}
                  question={question}
                  onChange={handleQuestionChange}
                  addAnswerChoice={addMoreAnswerChoices}
                  deleteQuestion={deleteQuestion}
                  index={index}
                />
              );
            case "paragraph":
              return (
                <Paragraph
                  key={question._id}
                  question={question}
                  onChange={handleQuestionChange}
                  deleteQuestion={deleteQuestion}
                  index={index}
                />
              );
            default:
              return null;
          }
        });
        const displaySubmitBtn = () => {
          if (questions.length >= 1){
            return <Button variant="info" onClick={onSubmitSurvey}>Save and Finish Survey</Button>;
          }
        }
        const SubmitBtn = displaySubmitBtn();
    
        const chooseQuestionTypeForm = (
          <>
            <h4>Choose a Question Type</h4>
            <Form.Select
              size="small"
              aria-label="Select Question Type"
              onChange={addQuestion}
            >
              <option></option>
              <option value="1">Short Response</option>
              <option value="2">Multiple Choice</option>
              <option value="3">True/False</option>
              <option value="4">Paragraph Response</option>
            </Form.Select>
          </>
        );
    
        const showAddAndSaveBtns = () =>{
            if(questions.length >= 1){
                return (
                    <div >
                        <Button style={{margin: 10}} variant="success" onClick={() => setShowAddQuestionBtn(false)}>
                            Add Question
                        </Button>
                        {SubmitBtn}
                    </div>
                )
            }
            else{
                return(
                    <Button variant="info" onClick={() => setShowAddQuestionBtn(false)}>
                        Add Question
                    </Button>
                );
            }
        }
    
        let bottomBtns = showAddAndSaveBtns();


    

  return (
    <div>E</div>
  )
}

