import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect, useCallback } from "react";
import uniqid from "uniqid";
import {
  MultipleChoice,
  Paragraph,
  ShortResponse,
  TrueFalse,
  SurveyTitle,
} from "./createQuestionComponents";
import { AlertDismissible } from './alert';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useParams } from "react-router-dom";


//the id from the survey created on the dashboard will be sent to this page
//on save and submit, the survey will be sent along with the
//questions to the database for creation as an entry

export function CreateSurvey(props) {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [survey, setSurvey] = useState({
    title: "",
    description: "",
    questions: [],
    user_id: "",
  });
  const [questionType, setQuestionType] = useState(1);
  const [showAddQuestionBtn, setShowAddQuestionBtn] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [editingPreviousSurvey, setEditingPreviousSurvey] = useState(false);
  let navigate = useNavigate(); 
  let { id } = useParams();


  const callApiToGetSurvey = useCallback(async (url, fetchOptions) => {
    
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
            }
            questions.push(newQuestion);
      });

      let updatedSurvey = {
        _id: responseData._id,
        questions: [],
        title: responseData.title,
        description: responseData.description,
        user_id: responseData.user_id,
        
      }

      setSurvey(updatedSurvey);
      setQuestions(questions)


    } catch (error) {
      console.log(error.error);
    }
  });

  const startSurvey = () => {
    //check if survey_id is being sent,
    //if survey_id is not sent, set survey as new survey
    if(id){
      //make api call to get the survey and set survey
      callApiToGetSurvey(`/api/surveys/${id}`, {method: "GET"});
      setEditingPreviousSurvey(true);
    }
    else{
      setSurvey({ ...survey, _id: uniqid("survey-")});
    }

  };

  //updated userid info
  useEffect(() => {
    if(user && isAuthenticated){
      let updatedSurvey = {...survey, user_id: user.sub};
      setSurvey(updatedSurvey);
    }

  }, [user])

  const handleSurveyChange = (e) => {
    let surveyObject = {
      ...survey,
    };
    surveyObject[e.target.name] = e.target.value;
    setSurvey(surveyObject);
  };

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
      (question) => id === question._id
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
    const questionIndex = questionArray.findIndex(
      (question) => id === question._id
    );
    questionArray.splice(questionIndex, 1);
    setQuestions(questionArray);
  };

  const callApi = useCallback(async (url, fetchOptions) => {
    const serverUrl = "http://localhost:5000";
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        ...fetchOptions,
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

    callApi("/api/surveys/create-update", {
      method: "POST",
      body: JSON.stringify({
        questions: questions,
        title: survey.title,
        description: survey.description,
        user_id: survey.user_id,
        creationTime: new Date(),
        survey_id: survey._id,
      }),
    });


    //direct user to see a preview of their survey on displaysurvey page
    //also send current survey id to dashboard
    props.sendSurveyId(survey._id);
    window.open(`/display-survey/${survey._id}`,'_blank');
    

   
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

    return (
      
      <div style={{ maxWidth: "50%", margin: "auto", paddingTop: 20 }}>
        <SurveyTitle onChange={handleSurveyChange} survey={survey} />
        {form}
        {showAddQuestionBtn === true ? (
          //showAddAndSaveBtns()
          questions.length >= 1 ? (
            <div>
              {(editingPreviousSurvey && <AlertDismissible />)}
              <Button
                style={{ margin: 10 }}
                variant="success"
                onClick={() => setShowAddQuestionBtn(false)}
              >
                Add Question
              </Button>
              
              
              <Button variant="info" onClick={onSubmitSurvey}>
                Save and Finish Survey
              </Button>
            </div>
          ) : (
            <Button variant="info" onClick={() => setShowAddQuestionBtn(false)}>
              Add Question
            </Button>
          )
        ) : (
          chooseQuestionTypeForm
        )}
      </div>
    );
  };
  let displayedSurveyCreator = makeSurvey();

  useEffect(() => {
    displayedSurveyCreator = makeSurvey();
  }, [questions]);

  useEffect(() => {
      startSurvey();
  }, [])

  return (

      
          <main className="main" style={{marginBottom: 20}}>{displayedSurveyCreator}</main>
       
      
    
  );
}
