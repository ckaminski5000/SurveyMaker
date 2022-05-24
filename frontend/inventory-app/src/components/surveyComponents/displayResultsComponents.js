

import { Form, Table } from "react-bootstrap";
import uniqid from "uniqid";

export function ShortResponseResults(props) {
  // display question
  //display answers in a table format
  
    const responses = props.question.responses.map((question, index))=> (
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

    <>
    <h4 style={{ textAlign: "center" }} className="text-muted">
  {props.question.question}
    </h4>
 
    <Table striped bordered hover>
  <thead>
    <tr>
      <th>Responses</th>
    </tr>
  </thead>
  <tbody>
    
    </tbody>
    </Table>
    </>
  );
}

export function MultipleChoiceResults(props) {
    //display question
    //display pie chart with answer choices

  const answerChoices = props.question.answer_choices.map((answer, index) => {
    return (
      <Form.Check
        key={uniqid()}
        id={props.question._id}
        label={answer}
        value={props.question.response.response}
        name={props.question._id}
        type="radio"
        onChange={(e) => props.onChange(e, props.responseId, "multiple choice")}
        defaultChecked
      />
    );
  });

  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {props.index + 1}) {props.question.question}
      </Form.Label>
      {answerChoices}
    </Form.Group>
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
