import React from 'react'
import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import { useApi } from '../hooks/useApi';
import { Button } from 'react-bootstrap';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { CreateSurvey } from '../components/createSurvey/createSurvey';
import { DisplaySurvey } from '../components/createSurvey/displaySurvey';


function Dashboard() {
  const { user, isAuthenticated, getAccessTokenSilently, isLoading, getAccessTokenWithPopup, login } = useAuth0();
  const [data, setData] = useState({
    message: '',
    error: null,
    loading: true
  });
  const [counter, setCounter] = useState(0);
  const [view, setView] = useState('displaySurvey');
  const [userData, setUserData] = useState({
                                      _id: 'google-oauth2|115359033007255963723',
                                      name: 'Cassie Kaminski',
                                      email: 'rice.cassie@gmail.com'
  });


 const serverUrl = 'http://localhost:5000';

  const callApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      const responseData = await response.json();

      setData({...data,
              loading: true,
              message: responseData.message});
    } catch (error) {
      setData({...data, error: error.error});
    }
  };

  const loginOrCreateUser = useCallback(async (user) => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${serverUrl}/users/login`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            name: user.name,
            email: user.email,
            _id: user.sub
        },
        )
      });

      const responseData = await response.json();

      setUserData(responseData);
      console.log(userData);
    } catch (error) {
      console.log(error);
      setData({...data, error: error.error});
    }
  });

 useEffect(()=> {
    if(counter === 0){
      if(isAuthenticated){
        console.log(user);
        loginOrCreateUser(user);
        setCounter(1)
        }
    }
  }, [user]);

  const renderSwitch = (param) => {
    switch(param){
      case 'createSurvey':
          return <CreateSurvey id={userData._id} />
      case 'displaySurvey':
          return <DisplaySurvey id={userData._id} />
      default:
        return 'Survey Dashboard'
    }
  }
  

  return (
    isAuthenticated && (
      <>
        <Header  name={userData.name} id={userData._id} />
        
        {renderSwitch(view)}
        <Footer />
      </>
    )
  );
}

export default Dashboard



//<Button onClick={callApi}>Call API</Button>
//<p>{JSON.stringify(data.message)}</p>



  /*const sendRequest = async() => {
    try{
      let res = await fetch("http://localhost:5000/users/getUser", {
       
        credentials: 'include'
  });
  let response = await res.json()
  return response;
    }
    catch(err){
      console.log(err);
    }
    
  }

 useEffect(() => {
    if(firstRender){
      firstRender = false;
      sendRequest().then((data) => {
        console.log(data);
        setUser(data.user);
      });
    }
    /*let interval = setInterval( () => {
      refreshToken().then(data => {
        console.log(data);
        setUser(data);
      })
    }, 28 * 1000)
  }, [])*/



  /*
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "http://localhost:5000";
  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });
  
        const { name, email, password, _id } = await metadataResponse.json();

        const userData = {_id, name, email, password}
  
        setUserMetadata(userData);
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);
 */




    /*
  //useapi

  const opts = {
    audience: 'http://localhost:5000',
    scope: 'read:users'
  }

  const {loading, error, refresh, data} = useApi('http://localhost:5000/users/', opts);

  const getTokenAndTryAgain = async () => {
    await getAccessTokenWithPopup(opts);
    refresh();
  };
 

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    if (error.error === 'login_required') {
      return <button onClick={() => login(opts)}>Login</button>;
    }
    if (error.error === 'consent_required') {
      return (
        <button onClick={getTokenAndTryAgain}>Consent to reading users</button>
      );
    }
    return <div>Oops {error.message}</div>;
  }*/