import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Table, Container, Col, Row } from "react-bootstrap";

export function DisplaySurveyList(props) {
  const [userId, setUserId] = useState(null);
  const [surveyList, setSurveyList] = useState(null);
  const [tableItems, setTableItems] = useState(
    <tr>
      <th>Surveys are loading...</th>
    </tr>
  );
  const { getAccessTokenSilently } = useAuth0();

  const retrieveSurveyData = useCallback(async () => {
    const serverUrl = "http://localhost:5000";
    //make api call to get list of surveys from user
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${serverUrl}/api/surveys/surveys-by-user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      //store survey titles and responses in state
      setSurveyList(responseData);
    } catch (error) {
      console.log(error.error);
    }
  });

  useEffect(() => {
    setUserId(props.id);
  }, [props.id]);

  useEffect(() => {
    if (userId === null) {
      return;
    } else {
      retrieveSurveyData();
    }
  }, [userId]);

  useEffect(() => {
    if (surveyList === null) {
      return;
    } else {
      let items = surveyList.map((survey, index) => (
        <tr key={index}>
          <th>{survey.title}</th>
          <th>Get Public Survey Link</th>
          <th>View Results</th>
        </tr>
      ));
      setTableItems(items);
    }
  }, [surveyList]);

  return (
    <Container>
       <Row>
            <Col><h2 style={{textAlign: 'center', padding: 10}}>Survey Dashboard</h2>
             </Col>
        </Row> 
        <Row>
            <Col>
                <Table striped bordered hover>
                    <tbody>{tableItems}</tbody>
                </Table>
            </Col>

        </Row>
      
    </Container>
  );
}
