import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { onLoginStatusChange, me } from "./modules/authManager";
import { Spinner } from "reactstrap";
import { Navbar } from './Navbar/Navbar';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);


  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  if (isLoggedIn === null) {
// Until we know whether or not the user is logged in or not, just show a spinner
return <Spinner className="app-spinner dark" />;
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn}/>
      <ApplicationViews isLoggedIn={isLoggedIn} userProfile={userProfile}/>
    </Router>
  );
}

