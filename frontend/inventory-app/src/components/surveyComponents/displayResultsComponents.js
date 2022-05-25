

import { Form, Table, Container, Row, Col, Button, } from "react-bootstrap";
import uniqid from "uniqid";
import { PieChart, Pie } from "recharts";


export function ShortResponseResults(props) {
  // display question
  //display answers in a table format
  
    const responses = props.question.responses.map((question, index) => (
        <tr key={index}>
            <th>
                {index})

            </th>
            <th>
                question.response.response
            </th>
        </tr>
    ))

  return (

    <Row>
      
    <Col>
    <h4 style={{ textAlign: "center" }} className="text-muted">
  Question {props.index}: {props.question.question}
    </h4>
 
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Responses</th>
    </tr>
  </thead>
  <tbody>
    {responses}
    
    </tbody>
    </Table>
    </Col>
    </Row>
  );
}

export function MultipleChoiceResults(props) {
    //display question
    //display pie chart with answer choices

 //count number of responses of each type
 let resultsArray = [];
 props.question.answer_choices.forEach(answer => {
   //search in responses for number of answers
   let count = props.question.responses.filter(response => response.response === answer).length;
   console.log(count);
   resultsArray.push({name: answer, value: count})
 })

  return (
    <>
    <Row>
      <Col>
      <h4>Question {props.index}: {props.question.question}</h4>
      <PieChart width={730} height={250}>
        <Pie data={resultsArray} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" />
      </PieChart>

      </Col>
    </Row>
    </>
  );
}



export function SurveyTitle(props) {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>{props.survey.title}</h2>
      <h4 style={{ textAlign: "center" }} className="text-muted">
        {props.survey.description}
      </h4>
      <br />
    </>
  );
}
