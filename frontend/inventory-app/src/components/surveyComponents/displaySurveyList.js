import React from "react";
import { useState, useEffect, useCallback} from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Table, Container, Col, Row, Button, Spinner } from "react-bootstrap";
import { ThreeDots } from '../loader';

export function DisplaySurveyList(props) {
  const [userData, setUserData] = useState(null);
  const [loginCounter, setLoginCounter] = useState(0);
  const [SurveyDataCounter, setSurveyDataCounter] = useState(0);
  const [surveyList, setSurveyList] = useState(null);
  const [tableItems, setTableItems] = useState(
    <tr>
      <th><div style={{textAlign: 'center', padding: 20}}><Spinner animation="border" /></div></th>
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
          <th className="dashboardTableLarge"><Link to={`/create-survey/${survey._id}`} style={{textDecoration: 'none'}}>{survey.title}</Link></th>
          <th className="dashboardTableSmall"><Link className="linkSmall" to={`/display-survey/${survey._id}`} target="_blank" style={{textDecoration: 'none'}}>Public Survey Link</Link></th>
          <th className="dashboardTableSmall"><Link className="linkSmall" to={`/display-results/${survey._id}`} style={{textDecoration: 'none'}}> Results ({survey.responseTotal})</Link></th>
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
    <Container className="dashboardbg p-0" fluid >
       <Row className="dashboardTitle" >
            <Col ><h2 style={{textAlign: 'center', paddingTop: 20, fontWeight: 'bold'}} >Survey Dashboard</h2>
             </Col>
        </Row> 
        <Row >
          <Col sm={12} lg={12} className="text-center" style={{padding: 15}} >
              <Button onClick={onCreateSurveyClick} variant="primary" className="createSrvyBtn" style={{borderRadius: 5, borderWidth: 1}}>
                Click Here to Create a New Survey
              </Button>
              <br /><br />
          </Col>
        </Row>

        <Row  >
            <Col >
              <h4 style={{textAlign: 'center', fontWeight: 'bold'}} >Your Surveys</h4>
              <div style={{borderTop: 'solid', paddingTop: 8}}>
                
              <Table striped bordered hover style={{width: '50%', textAlign: 'center', }}>
                    <tbody>{tableItems}</tbody>
                </Table>
              </div>
                
            </Col>

        </Row>
      
    </Container>
  );
}

