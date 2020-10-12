import React, { useState, useContext } from 'react';
import AppContext from './AppContext';
import { Link } from 'react-router-dom';
import './App.css';
import Jumbotron from './Jumbotron';
import Card from './Card';  
import EmailSubscribeForm from './EmailSubscribeForm';

const MainScreen = () => {

  const [globalState, setGlobalState] = useContext(AppContext);

  const [state, setState] = useState();

  return (
    <div className="screen">  

      <center>  
      <Jumbotron 
        title="Newsletter" 
        lead="Sign up to get the latest updates"
        description="Please enter your email address to be subscribed to our newsletter"
        btnLabel="Subscribe"
      >
        <EmailSubscribeForm btnLabel="Subscribe"/>
      </Jumbotron>
      </center>
      
      {
        !globalState.loggedIn &&
        <div className="container">
        <p>You need to be logged in</p>
        </div>
      }

      
      {
        globalState.loggedIn &&
        <div className="container" 
        style={{"display": "flex", "justify-content": "space-between"}}>

          <Card title="Apple" text="This is an iPhone" btnLabel="Buy Now" cardImage="https://images.unsplash.com/photo-1556656793-08538906a9f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"/>
          <Card title="Samsung" text="Better than an iPhone" btnLabel="Buy Now" cardImage="https://images.unsplash.com/photo-1498661705887-3778d9ecb4ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"/>
          <Card title="Nokia" text="Nokia is coming back" btnLabel="Buy Now" cardImage="https://images.unsplash.com/photo-1550367083-9fa5411cb303?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"/>
        </div>
      }

    </div>
  );
}

export default MainScreen;
