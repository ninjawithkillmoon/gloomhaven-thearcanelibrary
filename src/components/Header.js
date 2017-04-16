import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Navbar, Nav, Button } from 'react-bootstrap';

class HeaderComponent extends Component {

  newGame() {
    
  }

  loadGame() {

  }

  saveGame() {

  }

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <span>Gloomhaven Companion</span>
          </Navbar.Brand>
        </Navbar.Header>
        <ul className="nav navbar-nav">
          <li><Link to="/scenarios">Scenarios</Link></li>
          <li><Link to="/party">Party</Link></li>
          <li><Link to="/characters">Characters</Link></li>
          <li><Link to="/prosperity">Prosperity</Link></li>
          <li><Link to="/achievements">Achievements</Link></li>
          <li><Link to="/unlocks">Unlocks</Link></li>
        </ul>
        
      </Navbar>
    );
  }
}

export default HeaderComponent;