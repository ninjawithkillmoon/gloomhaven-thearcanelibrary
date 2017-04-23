import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
import * as ACHIEVEMENTS from './Achievements';
import * as PARTY from './Party';

export const SCENARIOS = [
  {}, // dummy scenario 0, just to make indexing by scenario number easier - eg. scenarios[1] refers to scenario number 1
  { 
    title: "Black Barrow",
    globalAchievementsRequired: [],
    globalAchievementsRequiredIncomplete: [],
    partyAchievementsRequired: [] 
  },
  { 
    title: "Barrow Lair",
    globalAchievementsRequired: [],
    globalAchievementsRequiredIncomplete: [],
    partyAchievementsRequired: [PARTY.PARTY_ACHIEVEMENTS.FIRST_STEPS] 
  },
  { 
    title: "Inox Encampment",
    globalAchievementsRequired: [],
    globalAchievementsRequiredIncomplete: [ACHIEVEMENTS.GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES],
    partyAchievementsRequired: [] 
  },
  { 
    title: "Crypt of the Damned",
    globalAchievementsRequired: [],
    globalAchievementsRequiredIncomplete: [],
    partyAchievementsRequired: [] 
  },
  { 
    title: "Ruinous Crypt",
    globalAchievementsRequired: [],
    globalAchievementsRequiredIncomplete: [],
    partyAchievementsRequired: [] 
  },
  { 
    title: "Decaying Crypt",
    globalAchievementsRequired: [],
    globalAchievementsRequiredIncomplete: [],
    partyAchievementsRequired: [] 
  },
  { 
    title: "Vibrant Grotto",
    globalAchievementsRequired: [ACHIEVEMENTS.GLOBAL_ACHIEVEMENTS.THE_POWER_OF_ENHANCEMENT, ACHIEVEMENTS.GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES],
    globalAchievementsRequiredIncomplete: [],
    partyAchievementsRequired: [] 
  },
  { 
    title: "Gloomhaven Warehouse",
    globalAchievementsRequired: [],
    globalAchievementsRequiredIncomplete: [ACHIEVEMENTS.GLOBAL_ACHIEVEMENTS.THE_DEAD_INVADE],
    partyAchievementsRequired: [PARTY.PARTY_ACHIEVEMENTS.JEKSERAHS_PLANS] 
  },
  { 
    title: "Diamond Mine",
    globalAchievementsRequired: [],
    globalAchievementsRequiredIncomplete: [ACHIEVEMENTS.GLOBAL_ACHIEVEMENTS.THE_MERCHANT_FLEES],
    partyAchievementsRequired: [] 
  },
  { 
    title: "Plane of Elemental Power",
    globalAchievementsRequired: [],
    globalAchievementsRequiredIncomplete: [ACHIEVEMENTS.GLOBAL_ACHIEVEMENTS.THE_RIFT_CLOSED],
    partyAchievementsRequired: [] 
  },
];

class ScenariosComponent extends Component {

  constructor() {
    super();

    this.state = GameStore.getGame();

    this.onChange = this.onChange.bind(this);
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

  isAllowedToDoScenario(number) {
    let scenario = SCENARIOS[number];

    // does the scenario have any required global achievements?
    if (scenario.globalAchievementsRequired.length > 0) {
      for (let i=0; i<scenario.globalAchievementsRequired.length; i++) {
        let requiredGlobalAchievement = scenario.globalAchievementsRequired[i];

        if (this.state.globalAchievements[requiredGlobalAchievement] === "true") {
          // we have this achievement - carry on!
        }
        else {
          // we do not have the required global achievement :(
          return false;
        }
      }
    }

    // does the scenario have any required global achievements that should be incomplete?
    if (scenario.globalAchievementsRequiredIncomplete.length > 0) {
      for (let i=0; i<scenario.globalAchievementsRequiredIncomplete.length; i++) {
        let requiredGlobalAchievementIncomplete = scenario.globalAchievementsRequiredIncomplete[i];

        if (this.state.globalAchievements[requiredGlobalAchievementIncomplete] === null) {
          // we do not have this achievement - carry on!
        }
        else {
          // we have the global achievement, so we can't do this scenario :(
          return false;
        }
      }
    }

    // does the scenario have any required party achievements?
    if (scenario.partyAchievementsRequired.length > 0) {
      for (let i=0; i<scenario.partyAchievementsRequired.length; i++) {
        let requiredPartyAchievement = scenario.partyAchievementsRequired[i];

        if (this.state.partyAchievements[requiredPartyAchievement] === "true") {
          // we have this achievement - carry on!
        }
        else {
          // we do not have the required party achievement :(
          return false;
        }
      }
    }

    // none of the above cases apply - we're allowed to do the scenario
    return true;
  }

  makeScenarioColumn(number) {
    // mainly just for testing - make sure we're not trying to render a scenario that doesn't exist
    if (number >= SCENARIOS.length) {
      return "";
    }

    let scenario = SCENARIOS[number];

    let buttonStyle = "";

    if (this.state.scenariosComplete && this.state.scenariosUnlocked) {
      if (this.state.scenariosComplete.indexOf(number) >= 0) {
        // scenario is complete - no need to check requirements
        buttonStyle = "btn-scoundrel";
      }
      else if (this.state.scenariosUnlocked.indexOf(number) >= 0) {
        // scenario is unlocked but we haven't done it yet - check the requirements
        if (this.isAllowedToDoScenario(number)) {
          // we are allowed to do this scenario
          buttonStyle = "btn-doomstalker";
        }
        else {
          // there is a party or global achievement blocking us from doing this scenario (this could change later)
          buttonStyle = "btn-lightning"; 
        }
      }
    }

    return (
      <Col key={number} xs={12} md={4} lg={3}>
        <Button onClick={() => this.toggleScenarioClick(number)} className={buttonStyle} block>{number}: {scenario.title}</Button>
      </Col>
    );
  }

  completeScenario(number) {
    let scenariosCompleteCopy = this.state.scenariosComplete;

    // double check it's not already completed
    if (scenariosCompleteCopy.indexOf(number) >= 0) {
      return;
    }

    scenariosCompleteCopy.push(number);

    this.setState({
      scenariosComplete: scenariosCompleteCopy
    }, function() {
      GameActions.changeGame(this.state);
    });
  }

  unlockScenario(number) {
    let scenariosUnlockedCopy = this.state.scenariosUnlocked;

    // double check it's not already unlocked
    if (scenariosUnlockedCopy.indexOf(number) >= 0) {
      return;
    }
    
    scenariosUnlockedCopy.push(number);

    this.setState({
      scenariosUnlocked: scenariosUnlockedCopy
    }, function() {
      GameActions.changeGame(this.state);
    });
  }

  lockScenario(number) {
    // to lock a scenario, it needs to be removed from both the unlocked and completed lists

    let scenariosCompleteCopy = this.state.scenariosComplete;
    let scenariosUnlockedCopy = this.state.scenariosUnlocked;

    let indexOfScenarioToRemoveFromUnlocked = scenariosUnlockedCopy.indexOf(number);
    let indexOfScenarioToRemoveFromComplete = scenariosCompleteCopy.indexOf(number);

    if (indexOfScenarioToRemoveFromUnlocked >= 0) {
      scenariosUnlockedCopy.splice(indexOfScenarioToRemoveFromUnlocked, 1);
    }

    if (indexOfScenarioToRemoveFromComplete >= 0) {
      scenariosCompleteCopy.splice(indexOfScenarioToRemoveFromComplete, 1);
    }

    this.setState({
      scenariosComplete: scenariosCompleteCopy,
      scenariosUnlocked: scenariosUnlockedCopy
    }, function() {
      GameActions.changeGame(this.state);
    });
  }

  toggleScenarioClick(number) {
    if (this.state.scenariosComplete.indexOf(number) >= 0) {
      // scenario is complete: mark it is locked again (this step allows users to undo their mistakes)
      this.lockScenario(number);
    }
    else if (this.state.scenariosUnlocked.indexOf(number) >= 0) {
      // scenario is unlocked but we haven't done it yet

      if (this.isAllowedToDoScenario(number)) {
        // we are allowed to do this scenario: mark it as complete
        this.completeScenario(number);
      }
      else {
        // something is blocking us from completing this scenario: mark it as locked again (this step allows users to undo their mistakes)
        this.lockScenario(number);
      }
    }
    else {
      // scenario is locked: mark it as unlocked
      this.unlockScenario(number);
    }
  }

  render() {
    let campaignMissionColumns = [];
    let personalQuestColumns = [];
    let randomScenarioColumns = [];
    let otherColumns = [];

    // campaign missions
    for (let i=1; i<= 51; i++) {
      campaignMissionColumns.push(this.makeScenarioColumn(i));
    }

    // personal quests
    for (let i=52; i<= 62; i++) {
      personalQuestColumns.push(this.makeScenarioColumn(i));
    }

    // random scenarios
    for (let i=63; i<= 71; i++) {
      randomScenarioColumns.push(this.makeScenarioColumn(i));
    }

    // other
    for (let i=72; i<= 95; i++) {
      otherColumns.push(this.makeScenarioColumn(i));
    }

    return (
      <div className="container scenarios-container">
      	<Grid>
      		<Row>
      			{campaignMissionColumns}
      		</Row>
          <hr />
          <Row>
            {personalQuestColumns}
          </Row>
          <hr />
          <Row>
            {randomScenarioColumns}
          </Row>
          <hr />
          <Row>
            {otherColumns}
          </Row>
      	</Grid>
      </div>
    );
  }
}

export default ScenariosComponent;