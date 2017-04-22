import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Scenarios from './components/Scenarios';
import Party from './components/Party';
import ScenarioLevel from './components/ScenarioLevel';
import Prosperity from './components/Prosperity';
import Achievements from './components/Achievements';
import Unlocks from './components/Unlocks';
import GameStore from './stores/GameStore';

class App extends Component {
  constructor() {
    super();

    this.state = {
      game: GameStore.getGame()
    }

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    GameStore.addGameChangeListener(this.onChange);
  }

  componentWillUnmount() {
    GameStore.removeGameChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      game: GameStore.getGame()
    });
  }

  render() {
    return (
      <Router>
        <div className="content">
          <Header></Header>

          <Route exact path="/" component={Home} />
          <Route path="/scenarios" component={Scenarios}/>
          <Route path="/party" component={Party}/>
          <Route path="/utilities/scenarioLevel" component={ScenarioLevel}/>
          <Route path="/prosperity" component={Prosperity}/>
          <Route path="/achievements" component={Achievements}/>
          <Route path="/unlocks" component={Unlocks}/>
        </div>
      </Router>
    );
  }
}

export default App;
