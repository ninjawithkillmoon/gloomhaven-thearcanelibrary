import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Navbar } from 'react-bootstrap';

class HeaderComponent extends Component {

  newGame() {
    
  }

  loadGame() {

  }

  saveGame() {

  }

  render() {
    let path = location.pathname;

    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Gloomhaven Companion</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <ul className="nav navbar-nav">
          <li className={path.startsWith("/scenarios") && "active"}><Link to="/scenarios">Scenarios</Link></li>
          <li className={path.startsWith("/party") && "active"}><Link to="/party">Party</Link></li>
          <li className={path.startsWith("/characters") && "active"}><Link to="/characters">Characters</Link></li>
          <li className={path.startsWith("/prosperity") && "active"}><Link to="/prosperity">Prosperity</Link></li>
          <li className={path.startsWith("/achievements") && "active"}><Link to="/achievements">Achievements</Link></li>
          <li className={path.startsWith("/unlocks") && "active"}><Link to="/unlocks">Unlocks</Link></li>
        </ul>
        
      </Navbar>
    );
  }
}

export default HeaderComponent;