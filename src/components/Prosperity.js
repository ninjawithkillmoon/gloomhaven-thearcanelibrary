import React, { Component } from 'react';
import { Grid, Row, Col, Table, Glyphicon, Button } from 'react-bootstrap';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

class ProsperityComponent extends Component {

	constructor() {
    super();

    this.state = {
      game: GameStore.getGame()
    }

    this.onChange = this.onChange.bind(this);
  }

  increaseProsperity() {
  	GameActions.changeProsperity(1);
  }

  decreaseProsperity() {
  	GameActions.changeProsperity(-1);
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

  /* takes in the number of checkmarks and outputs the prosperity level */
  prosperityLevel(ticks) {
		switch (true) {
		    case (ticks < 4):
		        return 1;
		    case (ticks < 9):
		        return 2;
	        case (ticks < 15):
		        return 3;
	        case (ticks < 22):
		        return 4;
	        case (ticks < 30):
		        return 5;
	        case (ticks < 39):
		        return 6;
	        case (ticks < 50):
		        return 7;
	        case (ticks < 64):
		        return 8;
	        case (ticks >= 64):
		        return 9;
		    default:
		        return 1;
		}
  }

  render() {
  	let level = this.prosperityLevel(this.state.game.prosperity);
  	let unlocked = <Glyphicon glyph="check" />

  	let prosperityChecks = [];

  	for (let i=1; i<=this.state.game.prosperity; i++) {
			if ([4, 9, 15, 22, 30, 39, 50, 64].indexOf(i) > -1) {
				prosperityChecks.push(<Glyphicon className="milestone" glyph="check" key={i} />);
			}
			else {
				prosperityChecks.push(<Glyphicon glyph="check" key={i} />);	
			}
  	}

  	for (let i=this.state.game.prosperity + 1; i<=64; i++) {
			if ([4, 9, 15, 22, 30, 39, 50, 64].indexOf(i) > -1) {
				prosperityChecks.push(<Glyphicon className="milestone" glyph="unchecked" key={i} />);
			}
			else {
				prosperityChecks.push(<Glyphicon glyph="unchecked" key={i} />);	
			}
  	}

    return (
      <div className="container">
      	<h2>Prosperity</h2>
      	<Grid>
      		<Row>
      			<Col xs={12} md={8} className="prosperity-checks-container">
      				<Row>
      					<Col xs={6} md={6}>
      						<Button href="#" className="btn-lightning" block onClick={this.decreaseProsperity.bind(this)}><Glyphicon glyph="minus" /></Button>
      					</Col>
      					<Col xs={6} md={6}>
      						<Button href="#" className="btn-scoundrel" block onClick={this.increaseProsperity.bind(this)}><Glyphicon glyph="plus" /></Button>
      					</Col>
      				</Row>

      				
    					
							
							<div className="prosperity-checks-list">
								{prosperityChecks}
							</div>
      			</Col>
      			<Col xs={12} md={4}>
      				<Table striped condensed hover>
						    <thead>
						      <tr>
						        <th>Item Numbers</th>
						        <th>Unlocked</th>
						      </tr>
						    </thead>
						    <tbody>
						      <tr>
						        <td>001 - 014</td>
						        <td>{level >= 1 && unlocked}</td>
						      </tr>
						      <tr>
						        <td>015 - 021</td>
						        <td>{level >= 2 && unlocked}</td>
						      </tr>
						      <tr>
						        <td>022 - 028</td>
						        <td>{level >= 3 && unlocked}</td>
						      </tr>
						      <tr>
						        <td>029 - 035</td>
						        <td>{level >= 4 && unlocked}</td>
						      </tr>
						      <tr>
						        <td>036 - 042</td>
						        <td>{level >= 5 && unlocked}</td>
						      </tr>
						      <tr>
						        <td>043 - 049</td>
						        <td>{level >= 6 && unlocked}</td>
						      </tr>
						      <tr>
						        <td>050 - 056</td>
						        <td>{level >= 7 && unlocked}</td>
						      </tr>
						      <tr>
						        <td>057 - 063</td>
						        <td>{level >= 8 && unlocked}</td>
						      </tr>
						      <tr>
						        <td>064 - 070</td>
						        <td>{level >= 9 && unlocked}</td>
						      </tr>
						    </tbody>
						  </Table>
      			</Col>
      		</Row>
      	</Grid>
      </div>
    );
  }
}

export default ProsperityComponent;