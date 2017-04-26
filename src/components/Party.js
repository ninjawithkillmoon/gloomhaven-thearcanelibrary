import React, { Component } from 'react';
import { Grid, Row, Col, Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon, Well, Label } from 'react-bootstrap';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

export const PARTY_ACHIEVEMENTS = {
  A_DEMONS_ERRAND: "A Demon's Errand",
  A_MAP_TO_TREASURE: "A Map to Treasure",
  ACROSS_THE_DIVIDE: "Across the Divide",
  AN_INVITATION: "An Invitation",
  BAD_BUSINESS: "Bad Business",
  DARK_BOUNTY: "Dark Bounty",
  DEBT_COLLECTION: "Debt Collection",
  FIRST_STEPS: "First Steps",
  FISHS_AID: "Fish's Aid",
  FOLLOWING_CLUES: "Following Clues",
  GRAVE_JOB: "Grave Job",
  HIGH_SEA_ESCORT: "High Sea Escort",
  JEKSERAHS_PLANS: "Jekserah's Plans",
  REDTHORNS_AID: "Redthorn's Aid",
  SIN_RA: "Sin-Ra",
  STONEBREAKERS_CENSER: "Stonebreaker's Censer",
  THE_DRAKES_COMMAND: "The Drake's Command",
  THE_DRAKES_TREASURE: "The Drake's Treasure",
  THE_POISONS_SOURCE: "The Poison's Source",
  THE_SCEPTER_AND_THE_VOICE: "The Scepter and the Voice",
  THE_VOICES_COMMAND: "The Voice's Command",
  THE_VOICES_TREASURE: "The Voice's Treasure",
  THROUGH_THE_NEST: "Through the Nest",
  THROUGH_THE_RUINS: "Through the Ruins",
  THROUGH_THE_TRENCH: "Through the Trench",
  TREMORS: "Tremors",
  WATER_STAFF: "Water Staff",
}

const possiblePartyAchievements = [
  PARTY_ACHIEVEMENTS.A_DEMONS_ERRAND,
  PARTY_ACHIEVEMENTS.A_MAP_TO_TREASURE,
  PARTY_ACHIEVEMENTS.ACROSS_THE_DIVIDE,
  PARTY_ACHIEVEMENTS.AN_INVITATION,
  PARTY_ACHIEVEMENTS.BAD_BUSINESS,
  PARTY_ACHIEVEMENTS.DARK_BOUNTY,
  PARTY_ACHIEVEMENTS.DEBT_COLLECTION,
  PARTY_ACHIEVEMENTS.FIRST_STEPS,
  PARTY_ACHIEVEMENTS.FISHS_AID,
  PARTY_ACHIEVEMENTS.FOLLOWING_CLUES,
  PARTY_ACHIEVEMENTS.GRAVE_JOB,
  PARTY_ACHIEVEMENTS.HIGH_SEA_ESCORT,
  PARTY_ACHIEVEMENTS.JEKSERAHS_PLANS,
  PARTY_ACHIEVEMENTS.REDTHORNS_AID,
  PARTY_ACHIEVEMENTS.SIN_RA,
  PARTY_ACHIEVEMENTS.STONEBREAKERS_CENSER,
  PARTY_ACHIEVEMENTS.THE_DRAKES_COMMAND,
  PARTY_ACHIEVEMENTS.THE_DRAKES_TREASURE,
  PARTY_ACHIEVEMENTS.THE_POISONS_SOURCE,
  PARTY_ACHIEVEMENTS.THE_SCEPTER_AND_THE_VOICE,
  PARTY_ACHIEVEMENTS.THE_VOICES_COMMAND,
  PARTY_ACHIEVEMENTS.THE_VOICES_TREASURE,
  PARTY_ACHIEVEMENTS.THROUGH_THE_NEST,
  PARTY_ACHIEVEMENTS.THROUGH_THE_RUINS,
  PARTY_ACHIEVEMENTS.THROUGH_THE_TRENCH,
  PARTY_ACHIEVEMENTS.TREMORS,
  PARTY_ACHIEVEMENTS.WATER_STAFF,
];

class PartyComponent extends Component {

  constructor() {
    super();

    this.state = GameStore.getGame();

    this.onChange = this.onChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleAchievement = this.toggleAchievement.bind(this);
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

  initPartyAchievements(callback, achievement) {
    // init party achievements if not already
    if (!this.state.partyAchievements) {
      this.setState({
        partyAchievements: {}
      }, function() {
        callback(achievement);
      });
    }
    else {
      callback(achievement);
    }
  }

  toggleAchievement(achievement) {
    let partyAchievementsCopy = this.state.partyAchievements;

    if (this.state.partyAchievements[achievement] === "true") {
      partyAchievementsCopy[achievement] = "lost";
    }
    else if (partyAchievementsCopy[achievement] === "lost") {
      partyAchievementsCopy[achievement] = null;
    }
    else {
      partyAchievementsCopy[achievement] = "true"
    }

    this.setState({
      partyAchievements: partyAchievementsCopy
    }, function() {
      GameActions.changeGame(this.state);
    });
  }

  toggleAchievementClick(achievement) {
    this.initPartyAchievements(this.toggleAchievement, achievement);
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


    let achievementColumns = [];
    for (let i=0; i<possiblePartyAchievements.length; i++) {
      let achievement = possiblePartyAchievements[i];

      let buttonStyle = "";
      if (this.state.partyAchievements) {
        if (this.state.partyAchievements[achievement] === "true") {
          buttonStyle = "btn-scoundrel";
        }
        else if (this.state.partyAchievements[achievement] === "lost") {
          buttonStyle = "btn-lightning";
        }
      }

      achievementColumns.push(<Col xs={12} md={6} lg={4} key={i}><Button className={buttonStyle} block onClick={this.toggleAchievementClick.bind(this, achievement)}>{achievement}</Button></Col>)
    }

    return (
      <div className="container">
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
                    placeholder="Mercenaries need a catchy name"
                    onChange={this.handleInputChange}
                  />
                </FormGroup>
                <FormGroup controlId="partyLocation">
                  <ControlLabel>Current Location</ControlLabel>
                  <FormControl
                    type="text"
                    name="partyLocation"
                    value={this.state.partyLocation}
                    placeholder="Where are your intrepid adventurers?"
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
                        <span className="reputation-header">Reputation</span>
                      </Col>
                      <Col xs={12} md={12} className="reputation-label">
                        <Label className="label-brute">{this.state.reputation || 0}</Label>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={4} md={4} className="text-center">
                    <Row>
                      <Col xs={12} md={12}>
                        <span className="reputation-header">Shop Price Modifier</span>
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
              <ControlLabel>Party Achievements</ControlLabel>
            </Col>
          </Row>
          <Row className="party-achievements-key">
            <Col xs={12} md={4} className="text-center">
              <Button className="btn-scoundrel">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Achievement Unlocked
            </Col>
            <Col xs={12} md={4} className="text-center">
              <Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Achievement Locked
            </Col>
            <Col xs={12} md={4} className="text-center">
              <Button className="btn-lightning">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button> Achievement Lost
            </Col>
          </Row>
          <Row className="achievements-container">
            {achievementColumns}
          </Row>
          <Row>
            <Col xs={12} md={12}>
              <Form>
                <FormGroup controlId="partyNotes">
                  <ControlLabel>Notes</ControlLabel>
                  <FormControl
                    componentClass="textarea" 
                    name="partyNotes"
                    value={this.state.partyNotes}
                    onChange={this.handleInputChange}
                    placeholder="Use this text area to enter any information that you would like to keep"
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