import { useState } from 'react'
import { Alert, Button } from 'react-bootstrap';

export function AlertDismissible() {
    const [show, setShow] = useState(true);
  
    return (
      <>
        <Alert show={show} variant="light">
          <Alert.Heading>Warning on Deletions!</Alert.Heading>
          <p>
            If you delete a question from this survey, the previous responses to that question will also be deleted.  
            Make sure you do not want to access the responses to deleted questions before clicking Save and Finish Survey.
          </p>
          <p>If you would still like to access the responses to deleted questions, make a new survey instead.  Do not click Save and Finish Survey.</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={() => setShow(false)} variant="outline-success">
              I understand this warning!
            </Button>
          </div>
        </Alert>
  
        {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
      </>
    );
  }