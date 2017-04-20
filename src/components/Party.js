import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon, Well, Label } from 'react-bootstrap';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

class PartyComponent extends Component {

  constructor() {
    super();

    this.state = GameStore.getGame();

    this.onChange = this.onChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  increaseReputation() {
    let newRep = this.state.reputation + 1 || 0

    if (newRep > 20) {
      newRep = 20;
    }

    this.setState({
      reputation: newRep
    }, function() {
      GameActions.changeGame(this.state);
    });
  }

  decreaseReputation() {
    let newRep = this.state.reputation - 1 || 0

    if (newRep < -20) {
      newRep = -20;
    }

    this.setState({
      reputation: newRep
    }, function() {
      GameActions.changeGame(this.state);
    });
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
    let shopPriceModifier = 0;

    if (this.state.reputation >= 19) {
      shopPriceModifier = -5;
    }
    else if (this.state.reputation >= 15) {
      shopPriceModifier = -4;
    }
    else if (this.state.reputation >= 11) {
      shopPriceModifier = -3;
    }
    else if (this.state.reputation >= 7) {
      shopPriceModifier = -2;
    }
    else if (this.state.reputation >= 3) {
      shopPriceModifier = -1;
    }
    else if (this.state.reputation >= -2) {
      shopPriceModifier = 0;
    }
    else if (this.state.reputation >= -6) {
      shopPriceModifier = 1;
    }
    else if (this.state.reputation >= -10) {
      shopPriceModifier = 2;
    }
    else if (this.state.reputation >= -14) {
      shopPriceModifier = 3;
    }
    else if (this.state.reputation >= -18) {
      shopPriceModifier = 4;
    }
    else if (this.state.reputation >= -20) {
      shopPriceModifier = 5;
    }
    else {
      shopPriceModifier = 0;
    }

    return (
      <div className="container">
      	<h2>Party</h2>
      	<Grid>
      		<Row>
            <Col xs={12} md={4}>
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
              </Form>
      			</Col>
            <Col xs={12} md={8}>
              <Well bsSize="large" className="reputation-well">
                <Row>
                  <Col xs={4} md={4}>
                    <Button className="btn-scoundrel" block onClick={this.increaseReputation.bind(this)}><Glyphicon glyph="plus" /></Button>
                    <Button className="btn-lightning" block onClick={this.decreaseReputation.bind(this)}><Glyphicon glyph="minus" /></Button>
                  </Col>
                  <Col xs={4} md={4} className="text-center">
                    <Row>
                      <Col xs={12} md={12}>
                        Reputation
                      </Col>
                      <Col xs={12} md={12} className="reputation-label">
                        <Label className="label-brute">{this.state.reputation || 0}</Label>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={4} md={4} className="text-center">
                    <Row>
                      <Col xs={12} md={12}>
                        Shop Price Modifier
                      </Col>
                      <Col xs={12} md={12} className="reputation-label">
                        <Label className="label-brute">{shopPriceModifier}</Label>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Well>
            </Col>
      		</Row>
          <Row>
            <Col xs={12} md={12}>
              <Form>
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