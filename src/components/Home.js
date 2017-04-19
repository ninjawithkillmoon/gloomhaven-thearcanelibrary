import React, { Component } from 'react';
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import GameActions from '../actions/GameActions';

class HomeComponent extends Component {

  loadGame() {
    GameActions.loadGame();
  }

  newGame() {

  }

  render() {
    return (
      <div className="container">
      	<h2>Home</h2>
      	<Grid>
      		<Row>
      			<Col xs={12} md={4} mdOffset={4}>
              <Button className="btn-lightning" block onClick={this.loadGame.bind(this)}><Glyphicon glyph="cloud-download" /> Load Game</Button>
              <Button className="btn-scoundrel" block onClick={this.newGame.bind(this)}><Glyphicon glyph="plus-sign" /> New Game</Button>
      			</Col>
      		</Row>
      	</Grid>
      </div>
    );
  }
}

export default HomeComponent;