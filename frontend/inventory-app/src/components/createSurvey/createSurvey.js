import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import uniqid from "uniqid";
import {
  MultipleChoice,
  Paragraph,
  ShortResponse,
  TrueFalse,
  SurveyTitle
} from "./createQuestionComponents";

//the id from the survey created on the dashboard will be sent to this page
//on save and submit, the survey will be sent along with the 
//questions to the database for creation as an entry

export function CreateSurvey(props) {
  const [survey, setSurvey] = useState({
    _id: uniqid('survey-'),
    title: '',
    description: '',
    questions: [],
    answer_choices: [],
    surveyId: "",
  });
  const [display, setDisplay] = useState("button");
  const [questionType, setQuestionType] = useState(1);
  const [showAddQuestionBtn, setShowAddQuestionBtn] = useState(false);
  const [questions, setQuestions] = useState([]);

  const startSurvey = () => {
    setDisplay("CreateSurvey");
    setSurvey({ ...survey, surveyId: uniqid("survey-") });
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
      answerChoices[e.target.getAttribute("answerNum")] = e.target.value;

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


  const onSubmit = (e) => {
    e.preventDefault();
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

    const showAddAndSaveBtns = () =>{
        if(questions.length >= 1){
            return (
                <div >
                    <Button style={{margin: 10}} variant="success" onClick={() => setShowAddQuestionBtn(false)}>
                        Add Question
                    </Button>
                    <Button style={{margin: 10}} variant="info">Save and Finish Survey</Button>
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
      <div style={{ maxWidth: "50%", margin: 'auto' }}>
        <SurveyTitle 
        onChange={handleSurveyChange}
        survey={survey}
        />
        {form}
        {showAddQuestionBtn === true ? 
          bottomBtns
         : (
          chooseQuestionTypeForm
        )}
      </div>
    );
  };
  let displayedSurveyCreator = makeSurvey();

  useEffect(() => {
    displayedSurveyCreator = makeSurvey();
  }, [questions]);

  return (
    <>
      <div style={{padding: 20, margin: 'auto'}}>
        
            {display === "button" ? (
              <>  
              <Button variant="info" onClick={startSurvey}>
                Click Here to Create a Survey
              </Button>
              {questions.length >= 1 ? <Button variant="info">Save and Finish Survey</Button> : null} 
            </>
            ) : (
              <div>
                  {displayedSurveyCreator}
                  </div>
            )}
          </div>
    </>
  );
}
