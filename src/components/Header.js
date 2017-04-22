import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Button, Glyphicon, Nav, NavItem } from 'react-bootstrap';
import GameActions from '../actions/GameActions';

class HeaderComponent extends Component {

  saveGame() {
    GameActions.saveGame();
  }

  loadGame() {
    GameActions.loadGame();
  }

  render() {
    let path = location.pathname;

    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Gloomhaven Companion</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <ul className="nav navbar-nav">
            <li className={path.startsWith("/scenarios") && "active"}><Link to="/scenarios">Scenarios</Link></li>
            <li className={path.startsWith("/party") && "active"}><Link to="/party">Party</Link></li>
            <li className={path.startsWith("/characters") && "active"}><Link to="/characters">Characters</Link></li>
            <li className={path.startsWith("/prosperity") && "active"}><Link to="/prosperity">Prosperity</Link></li>
            <li className={path.startsWith("/achievements") && "active"}><Link to="/achievements">Achievements</Link></li>
            {/*<li className={path.startsWith("/unlocks") && "active"}><Link to="/unlocks">Unlocks</Link></li>}*/}
            <li className={path.startsWith("/utilities") ? "active dropdown" : "dropdown"}>
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                Utilities&nbsp;
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li><Link to="/utilities/scenarioLevel">Scenario Level</Link></li>
                <li><Link to="/utilities/enhancementCalculator">Enhancement Calculator</Link></li>
                {/*<li role="separator" className="divider"></li>*/}
              </ul>
            </li>
          </ul>
          <p className="navbar-btn">
            <Button className="btn-brute" onClick={this.loadGame.bind(this)}><Glyphicon glyph="cloud-download" /> Load</Button>
            <Button className="btn-scoundrel" onClick={this.saveGame.bind(this)}><Glyphicon glyph="cloud-upload" /> Save</Button>
          </p>
        </Navbar.Collapse>
        

        
        
      </Navbar>
    );
  }
}

export default HeaderComponent;