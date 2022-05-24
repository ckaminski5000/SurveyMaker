import { Form } from "react-bootstrap";
import uniqid from "uniqid";

export function ShortResponse(props) {
  console.log("hello");
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {props.index + 1}) {props.question.question}
      </Form.Label>
      <Form.Control
        id={props.question._id}
        onChange={(e) => props.onChange(e, props.responseId, "short response")}
        name="short response"
        value={props.question.response.response}
        type="text"
      />
    </Form.Group>
  );
}

export function MultipleChoice(props) {
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

export function Paragraph(props) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>
        {props.index + 1}) {props.question.question}
      </Form.Label>
      <Form.Control
        id={props.question._id}
        onChange={(e) => props.onChange(e, props.responseId, "paragraph")}
        name="paragraph"
        value={props.question.response.response}
        type="text"
        as="textarea"
        rows={3}
      />
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
