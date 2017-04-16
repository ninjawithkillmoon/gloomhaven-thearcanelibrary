import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Scenarios from './components/Scenarios';
import Party from './components/Party';
import Characters from './components/Characters';
import Prosperity from './components/Prosperity';
import Achievements from './components/Achievements';
import Unlocks from './components/Unlocks';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="content">
          <Header></Header>

          <Route exact path="/" />
          <Route path="/scenarios" component={Scenarios}/>
          <Route path="/party" component={Party}/>
          <Route path="/characters" component={Characters}/>
          <Route path="/prosperity" component={Prosperity}/>
          <Route path="/achievements" component={Achievements}/>
          <Route path="/unlocks" component={Unlocks}/>
        </div>
      </Router>
    );
  }
}

export default App;
