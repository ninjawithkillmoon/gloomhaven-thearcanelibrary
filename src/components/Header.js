import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Button, Glyphicon } from 'react-bootstrap';
import GameActions from '../actions/GameActions';

class HeaderComponent extends Component {

  saveGame() {
    GameActions.saveGame();
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
        <p className="navbar-btn">
          <Button className="btn-scoundrel" onClick={this.saveGame.bind(this)}><Glyphicon glyph="cloud-upload" /> Save Game</Button>
        </p>
        
        
      </Navbar>
    );
  }
}

export default HeaderComponent;