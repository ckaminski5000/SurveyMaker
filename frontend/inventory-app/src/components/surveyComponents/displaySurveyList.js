import React from "react";
import { useState, useEffect, useCallback} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Table, Container, Col, Row, Button } from "react-bootstrap";
import { ThreeDots } from '../loader';

export function DisplaySurveyList(props) {
  const [userData, setUserData] = useState(null);
  const [loginCounter, setLoginCounter] = useState(0);
  const [SurveyDataCounter, setSurveyDataCounter] = useState(0);
  const [surveyList, setSurveyList] = useState(null);
  const [tableItems, setTableItems] = useState(
    <tr>
      <th>Surveys are loading...</th>
    </tr>
  );
  const { getAccessTokenSilently, user, isAuthenticated } = useAuth0();
  let navigate = useNavigate(); 


  const retrieveSurveyData = useCallback(async () => {
    const serverUrl = "http://localhost:5000";
    //make api call to get list of surveys from user
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${serverUrl}/api/surveys/surveys-by-user/${user.sub}`,
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
    if(isAuthenticated ){

      if(loginCounter === 0){
    setLoginCounter(1);
    props.loginOrCreateUser(user);
    
      }
      
    }
  }, []);

  useEffect(() => {
    if (user) {
      if(SurveyDataCounter === 0){
        setSurveyDataCounter(1);
        retrieveSurveyData();
        
      }
     
    }
  }, [user]);

  useEffect(() => {
    if (surveyList) {
      let items = surveyList.map((survey, index) => (
        <tr key={index}>
          <th><Link to={`/create-survey/${survey._id}`} onClick={props.sendSurveyId(survey._id)}>{survey.title}</Link></th>
          <th>Get Public Survey Link</th>
          <th>View Results ({survey.responseTotal})</th>
        </tr>
      ));
      setTableItems(items);
    }
  }, [surveyList]);

  const onCreateSurveyClick = () => {
    props.sendSurveyId(null)
    navigate('/create-survey')
  }

  return (
    <Container>
       <Row>
            <Col><h2 style={{textAlign: 'center', paddingTop: 10}}>Survey Dashboard</h2>
             </Col>
        </Row> 
        <Row>
          <Col sm={12} lg={12} className="text-center">
              <Button onClick={onCreateSurveyClick} variant="success" style={{width: '20%', marginBlock: 10}}>
                Click Here to Create a Survey
              </Button>
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
