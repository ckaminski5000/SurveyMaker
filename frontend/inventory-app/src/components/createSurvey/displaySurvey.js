import React from 'react'
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import uniqid from "uniqid";
import { SurveyTitle, Paragraph, ShortResponse, MultipleChoice, TrueFalse } from './displayQuestionComponents';


export function DisplaySurvey(props) {

    const [survey, setSurvey] = useState({
                                    _id: uniqid('survey-'),
                                    title: "Survey Title",
                                    description: 'Survey Description',
                                    questions: [
                                        {
                                          type: "multiple choice",
                                          question: "What is your favorite color?",
                                          answer_choices: [
                                            "Pink",
                                            "purple",
                                            "blue",
                                            "other"
                                          ],
                                          _id: "question-l394suzc",
                                          response: {
                                            response: '',
                                            time: '',
                                            _id: uniqid('response-')
                                        }
                                        },
                                        {
                                          type: "short response",
                                          question: "Did you have a good day today?",
                                          answer_choices: [],
                                          _id: "question-l39650gv",
                                          response: {
                                            response: '',
                                            time: '',
                                            _id: uniqid('response-')
                                        }
                                        },
                                        {
                                          type: "true/false",
                                          question: "Are you happy",
                                          answer_choices: ["True", "False"],
                                          _id: "question-l3965dyz",
                                          response: {
                                            response: '',
                                            time: '',
                                            _id: uniqid('response-')
                                        }
                                        },
                                        {
                                            type: "paragraph",
                                            question: "What did you do today?",
                                            answer_choices: [],
                                            _id: "question-l392343dyz",
                                            response: {
                                                response: '',
                                                time: '',
                                                _id: uniqid('response-')
                                            }
                                          }
                                      ],
                                      user_id: uniqid('user-')
    })


const handleChange = (e, responseId, responseType) => {
    
        let surveyObject = {...survey};
        let index = surveyObject.questions.findIndex(question => question.response._id === responseId);
        surveyObject.questions[index].response = {...surveyObject.questions[index].response,
                                    response: e.target.value,
                                    time: new Date(),
                                    
        };
        setSurvey(surveyObject);
}


    
const form = survey.questions.map((question, index) => {
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
        });
  


  return (
    <div  className="displaySurvey">
        <SurveyTitle
            survey={survey}
        />
        {form}
        <Button>Submit Survey</Button>
    </div>
  )
}