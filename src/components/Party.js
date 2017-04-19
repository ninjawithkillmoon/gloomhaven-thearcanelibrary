import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

class PartyComponent extends Component {

  constructor() {
    super();

    this.state = GameStore.getGame();

    this.onChange = this.onChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentWillMount() {
    GameStore.addGameChangeListener(this.onChange);
  }

  componentWillUnmount() {
    GameStore.removeGameChangeListener(this.onChange);
  }

  onChange() {
    this.setState(GameStore.getGame());
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, function() {
      GameActions.changeGame(this.state);
    });
  }

  render() {
    return (
      <div className="container">
      	<h2>Party</h2>
      	<Grid>
      		<Row>
            <Col xs={12} md={12}>
              <Form>
                <FormGroup controlId="partyName">
                  <ControlLabel>Party Name</ControlLabel>
                  <FormControl
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Enter party name"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId="partyLocation">
                  <ControlLabel>Current Location</ControlLabel>
                  <FormControl
                    type="text"
                    name="partyLocation"
                    value={this.state.partyLocation}
                    placeholder="Enter party location"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId="partyAchievements">
                  <ControlLabel>Party Achievements</ControlLabel>
                  <FormControl
                    componentClass="textarea" 
                    name="partyAchievements"
                    value={this.state.partyAchievements}
                    onChange={this.handleInputChange}
                    className="party-text-area"
                  />
                </FormGroup>
                <FormGroup controlId="partyNotes">
                  <ControlLabel>Notes</ControlLabel>
                  <FormControl
                    componentClass="textarea" 
                    name="partyNotes"
                    value={this.state.partyNotes}
                    onChange={this.handleInputChange}
                    className="party-text-area"
                  />
                </FormGroup>
              </Form>
      			</Col>
      		</Row>
      	</Grid>
      </div>
    );
  }
}

export default PartyComponent;