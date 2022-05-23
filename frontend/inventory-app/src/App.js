import "./bootstrap.min.css";
import "./index.css";
import { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CreateSurvey } from "./components/createSurvey/createSurvey";
import { DisplaySurvey } from "./components/createSurvey/displaySurvey";
import { DisplaySurveyList } from "./components/createSurvey/displaySurveyList";
import { Splash } from "./pages/splash";

function App() {
  const { isAuthenticated, getAccessTokenSilently, isLoading, login } =
    useAuth0();
  const [userData, setUserData] = useState(null);
  const [currentSurveyId, setCurrentSurveyId] = useState(null);
  const [error, setError] = useState(false);

  const loginOrCreateUser = useCallback(async (user) => {
    let serverUrl = "http://localhost:5000";
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}/users/login`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          _id: user.sub,
        }),
      });

      const responseData = await response.json();

      setUserData(responseData);
      console.log(userData);
    } catch (error) {
      console.log(error);
      setError({ error: error.error });
    }
  });

  const sendSurveyId = (id) => {
    setCurrentSurveyId(id);
  };

  return (
    <>
      <main>
      <Header
            name={userData !== null && userData.name}
            id={userData !== null && userData._id}
            sendSurveyId={sendSurveyId}
          />
        <Routes>
          
          <Route path="/" element={<Splash />} />
          userData !== null && (
          <Route
            path="/dashboard"
            element={
              <DisplaySurveyList
                id={userData!== null && (userData._id)}
                loginOrCreateUser={loginOrCreateUser}
                sendSurveyId={sendSurveyId}
              />
            }
          />
          <Route
            path="/create-survey"
            element={
              <CreateSurvey id={userData!== null && (userData._id)} surveyId={currentSurveyId} sendSurveyId={sendSurveyId} />
            }
          />
          <Route
            path="/create-survey/:id"
            element={
              <CreateSurvey id={userData!== null && (userData._id)} surveyId={currentSurveyId} sendSurveyId={sendSurveyId} />
            }
          />
          <Route
            path="/display-survey/:id"
            element={
              <DisplaySurvey id={userData!== null && (userData._id)} surveyId={currentSurveyId} sendSurveyId={sendSurveyId} />
            }
          />{" "}
          );
         
        </Routes>
        <Footer />
      </main>
    </>
  );
}

export default App;
