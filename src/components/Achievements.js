import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';

const ANCIENT_TECHNOLOGY_1 = "Ancient Technology 1";
const ANCIENT_TECHNOLOGY_2 = "Ancient Technology 2";
const ANCIENT_TECHNOLOGY_3 = "Ancient Technology 3";
const ANCIENT_TECHNOLOGY_4 = "Ancient Technology 4";
const ANCIENT_TECHNOLOGY_5 = "Ancient Technology 5";
const ANNIHILATION_OF_THE_ORDER = "Annihilation of the Order";
const ARTIFACT_RECOVERED = "Artifact: Recovered";
const ARTIFACT_LOST = "Artifact: Lost";
const ARTIFACT_CLEANSED = "Artifact: Cleansed";
const CITY_RULE_MILITARISTIC = "City Rule: Militaristic";
const CITY_RULE_ECONOMIC = "City Rule: Economic";
const CITY_RULE_DEMONIC = "City Rule: Demonic";
const END_OF_THE_INVASION = "End of the Invasion";
const END_OF_CORRUPTION_1 = "End of Corruption 1";
const END_OF_CORRUPTION_2 = "End of Corruption 2";
const END_OF_CORRUPTION_3 = "End of Corruption 3";
const END_OF_GLOOM = "End of Gloom";
const THE_DRAKE_SLAIN = "The Drake Slain";
const THE_DRAKE_AIDED = "The Drake Aided";
const THE_DEAD_INVADE = "The Dead Invade";
const THE_DEMON_DETHRONED = "The Demon Dethroned";
const THE_EDGE_OF_DARKNESS = "The Edge of Darkness";
const THE_MERCHANT_FLEES = "The Merchant Flees";
const THE_POWER_OF_ENHANCEMENT = "The Power of Enhancement";
const THE_RIFT_CLOSED = "The Rift Closed";
const THE_VOICE_SILENCED = "The Voice: Silenced";
const THE_VOICE_FREED = "The Voice: Freed";
const WATER_BREATHING = "Water-Breathing";

const possibleAchievements = [
  [
    ANCIENT_TECHNOLOGY_1,
    ANCIENT_TECHNOLOGY_2,
    ANCIENT_TECHNOLOGY_3,
    ANCIENT_TECHNOLOGY_4,
    ANCIENT_TECHNOLOGY_5
  ],
  [
    ARTIFACT_RECOVERED,
    ARTIFACT_LOST,
    ARTIFACT_CLEANSED,
  ],
  [
    CITY_RULE_MILITARISTIC,
    CITY_RULE_ECONOMIC,
    CITY_RULE_DEMONIC,
  ],
  [
    END_OF_CORRUPTION_1,
    END_OF_CORRUPTION_2,
    END_OF_CORRUPTION_3,
  ],
  [
    THE_DRAKE_SLAIN,
    THE_DRAKE_AIDED,
  ],
  [
    THE_DEMON_DETHRONED,
    THE_RIFT_CLOSED,
  ],
  [
    THE_VOICE_SILENCED,
    THE_VOICE_FREED,
  ],
  [
    ANNIHILATION_OF_THE_ORDER,
    END_OF_THE_INVASION,
    END_OF_GLOOM,
    THE_DEAD_INVADE,
    THE_EDGE_OF_DARKNESS,
    THE_MERCHANT_FLEES,
    THE_POWER_OF_ENHANCEMENT,
    WATER_BREATHING,
  ],
];

class AchievementsComponent extends Component {

  constructor() {
    super();

    this.state = GameStore.getGame();

    this.onChange = this.onChange.bind(this);
    this.toggleAchievement = this.toggleAchievement.bind(this);
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

  initGlobalAchievements(callback, achievement) {
    // init global achievements if not already
    if (!this.state.globalAchievements) {
      this.setState({
        globalAchievements: {}
      }, function() {
        callback(achievement);
      });
    }
    else {
      callback(achievement);
    }
  }

  toggleAchievement(achievement) {
    let globalAchievementsCopy = this.state.globalAchievements;

    if (this.state.globalAchievements[achievement]) {
      globalAchievementsCopy[achievement] = null;
    }
    else {
      // only one artifact achievement allowed
      if (achievement.startsWith("Artifact")) {
        globalAchievementsCopy[ARTIFACT_RECOVERED] = null;
        globalAchievementsCopy[ARTIFACT_CLEANSED] = null;
        globalAchievementsCopy[ARTIFACT_LOST] = null;
      }

      if (achievement.startsWith("The Drake")) {
        globalAchievementsCopy[THE_DRAKE_AIDED] = null;
        globalAchievementsCopy[THE_DRAKE_SLAIN] = null;
      }

      if (achievement.startsWith("City Rule")) {
        globalAchievementsCopy[CITY_RULE_DEMONIC] = null;
        globalAchievementsCopy[CITY_RULE_ECONOMIC] = null;
        globalAchievementsCopy[CITY_RULE_MILITARISTIC] = null;
      }

      if (achievement.startsWith("The Voice")) {
        globalAchievementsCopy[THE_VOICE_FREED] = null;
        globalAchievementsCopy[THE_VOICE_SILENCED] = null;
      }

      if (achievement.startsWith("The Demon Dethroned")) {
        globalAchievementsCopy[THE_RIFT_CLOSED] = null;
      }
      else if (achievement.startsWith("The Rift Closed")) {
        globalAchievementsCopy[THE_DEMON_DETHRONED] = null;
      }

      globalAchievementsCopy[achievement] = "true"
    }

    this.setState({
      globalAchievements: globalAchievementsCopy
    }, function() {
      GameActions.changeGame(this.state);
    });
  }

  toggleAchievementClick(achievement) {
    this.initGlobalAchievements(this.toggleAchievement, achievement);
  }

  render() {
    let achievementHtml = [];

    for (let i=0; i<possibleAchievements.length; i++) {
      let achievementButtons = [];

      for (let j=0; j<possibleAchievements[i].length; j++) {

        let achievement = possibleAchievements[i][j];
        let buttonStyle = "";

        if (this.state.globalAchievements && this.state.globalAchievements[achievement]) {
          buttonStyle = "btn-scoundrel";
        }

        achievementButtons.push(<Col xs={12} md={6} lg={4} key={j}><Button className={buttonStyle} block onClick={this.toggleAchievementClick.bind(this, achievement)}>{achievement}</Button></Col>)
      }

      let divider = null;
      if (i < possibleAchievements.length - 1) {
        divider = <hr />
      }

      achievementHtml.push(
        <div key={i}>
          <Row>{achievementButtons}</Row>
          {divider}
        </div>
      )
    }

    return (
      <div className="container">
      	<Grid>
      		<Row>
      			<Col xs={12} md={12} className="achievements-container">
              <Row>
                {achievementHtml}
              </Row>
      			</Col>
      		</Row>
      	</Grid>
      </div>
    );
  }
}

export default AchievementsComponent;