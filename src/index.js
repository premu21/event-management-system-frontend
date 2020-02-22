import React from 'react';
import ReactDOM  from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import AddEvent from './modules/AddEvent/AddEvent';
import EventRegistrations from './modules/EventRegistrations/EventRegistrations';
import RegisterParticipants from './modules/RegisterParticipants/RegisterParticipants';
import EventList from './modules/EventList/EventList';
//import { Router, Route, browserHistory } from 'react-router';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

ReactDOM.render((
   <Router>
      <Switch>
          <Route path = "/">
            <EventList />
            </Route>
         {/* <Route path = "addevent" component = {AddEvent} />
         <Route path = "eventregistrations" component = {EventRegistrations} />
         <Route path = "registerparticipants" component = {RegisterParticipants} /> */}
      </Switch>
   </Router>
), document.getElementById('app'));


// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();