import React, { Component } from 'react';
import { Grid, Row, Col, Button, ProgressBar, Modal } from 'react-bootstrap';
import GameStore from '../stores/GameStore';
import GameActions from '../actions/GameActions';
import GloomhavenIcon from '../components/utils/GloomhavenIcon';
import * as MONSTER_STATS from '../constants/MonsterStats';

const iconWidth = "30px";
const iconWidthSmall = "18px";

class MonsterHealthComponent extends Component {

  constructor() {
    super();

    this.state = {
      game: GameStore.getGame(),
      displayMonsterType: "ACTIVE",
      statusTokenPopup: ""
    } 

    this.onChange = this.onChange.bind(this);
    this.scenarioGo = this.scenarioGo.bind(this);
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

  getAllActiveMonsters() {
    let activeMonsterList = [];

    // cycle through all the monsters of all different types, looking for the ones that are active
    for (let monsterNameProperty in this.state.game.monsterHealth.monsters) {
      if (this.state.game.monsterHealth.monsters.hasOwnProperty(monsterNameProperty)) {
        let monsterRecords = this.state.game.monsterHealth.monsters[monsterNameProperty];

        let activeMonsterRecords = monsterRecords.filter(function(currentValue, index) {
          return currentValue.alive;
        });

        activeMonsterList = activeMonsterList.concat(activeMonsterRecords);
      }
    }

    return activeMonsterList;
  }

  getMonsterType(monsterName) {
    return MONSTER_STATS.MONSTERS.monsters[monsterName];
  }

  getMonsterLevelStats(monster) {
    return this.getMonsterType(monster.name).level[monster.level];
  }

  makeMonsterToggleButton(monsterToDisplay) {
    let buttonClass = "btn-monster-dead";
    if (monsterToDisplay.alive) {
      if (monsterToDisplay.elite) {
        buttonClass = "btn-monster-elite";
      }
      else {
        buttonClass = "btn-monster-normal";
      }

      if (monsterToDisplay.summon) {
        buttonClass += " btn-monster-summon";
      }
    }

    buttonClass += " btn-monster";

    let monsterStatusTokens = [];

    if (!monsterToDisplay.statusTokens) {
      monsterToDisplay.statusTokens = [];
    }

    for (let i=0; i<monsterToDisplay.statusTokens.length; i++) {
      let statusToken = monsterToDisplay.statusTokens[i];

      monsterStatusTokens.push(
        <GloomhavenIcon key={i} icon={statusToken} width={iconWidthSmall} />
      );
    }

    let buttonText = monsterToDisplay.name + ' ' + monsterToDisplay.number;
    if (monsterToDisplay.summon && monsterToDisplay.alive) {
      buttonText += '*';
    }

    return (
      <Button block onClick={() => this.toggleMonster(monsterToDisplay)} className={buttonClass}>
        {buttonText} {monsterStatusTokens}
      </Button>
    );
    
  }

  makeMonsterKillButton(monsterToDisplay) {
    return (
      <Button disabled={!monsterToDisplay.alive} block onClick={() => this.showConfirmKillMonster(monsterToDisplay)} className={"btn-lightning" + (!monsterToDisplay.alive ? " btn-disabled" : "")}>Kill Monster</Button>
    );
  }

  calculateBossHealth(healthString, scenarioLevel, numPlaying) {
    let health = 0;

    let healthParts = healthString.split("x");

    for (let i=0; i<healthParts.length; i++) {
      let healthPart = healthParts[i];

      // translate this part of the health string to a number
      if (healthPart === "C") {
        // number of characters
        healthPart = numPlaying;
      }
      else if (healthPart === "L") {
        // scenario level
        healthPart = scenarioLevel;
      }

      if (health <= 0) {
        // this is the first number we're adding to the calculation
        health = healthPart
      }
      else {
        // multiple this number by the previous health number
        health *= healthPart;
      }
    }

    return health;
  }

  makeMonsterHealthProgressBar(monsterToDisplay) {
    let gameCopy = this.state.game;
    let monsterType = this.getMonsterType(monsterToDisplay.name);
    let monsterLevelStats = this.getMonsterLevelStats(monsterToDisplay);

    let maxHealth = 0;

    if (monsterType.isBoss) {
      maxHealth = this.calculateBossHealth(monsterLevelStats.health, monsterToDisplay.level, gameCopy.monsterHealth.defaultNumPlaying);
    }
    else {
      if (monsterToDisplay.elite) {
        maxHealth = monsterLevelStats.elite.health;
      }
      else {
        maxHealth = monsterLevelStats.normal.health;
      }
    }

    let healthNow = maxHealth - monsterToDisplay.damage;
    if (healthNow < 0) {
      healthNow = 0;
    }

    return (
      <ProgressBar label={healthNow} max={maxHealth} min={0} now={healthNow} className="progress-grey" />
    );
  }

  makeMonsterDamageHealButton(monsterToDisplay, isHeal) {
    let text = "-";
    let damageAmount = 1;
    let buttonClass = "btn-doomstalker";

    if (isHeal) {
      text = "+";
      damageAmount = -1;
      buttonClass = "btn-brute";
    }

    if (!monsterToDisplay.alive) {
      buttonClass += " btn-disabled"
    }

    return (
      <Button disabled={!monsterToDisplay.alive} block onClick={() => this.changeMonsterDamage(monsterToDisplay, damageAmount)} className={buttonClass}>{text}</Button>
    );
  }

  makeMonsterScenarioLevelButton(monsterToDisplay) {
    return (
      <Button disabled={!monsterToDisplay.alive} onClick={() => this.changeMonsterScenarioLevel(monsterToDisplay)} className={(!monsterToDisplay.alive ? " btn-disabled" : "")} block>{monsterToDisplay.level}</Button>
    );
  }

  makeDisplayedMonsterSection(monsterToDisplay) {
    let key = monsterToDisplay.name + monsterToDisplay.number;

    let monsterToggleButton = this.makeMonsterToggleButton(monsterToDisplay);
    let monsterKillButton = this.makeMonsterKillButton(monsterToDisplay);
    let monsterHealthProgressBar = this.makeMonsterHealthProgressBar(monsterToDisplay);
    let monsterTakeDamageButton = this.makeMonsterDamageHealButton(monsterToDisplay, false);
    let monsterHealButton = this.makeMonsterDamageHealButton(monsterToDisplay, true);
    let monsterLevelButton = this.makeMonsterScenarioLevelButton(monsterToDisplay);

    return(
      <Col xs={12} md={6} key={key} className="monster-health-col">
        <Row>
          <Col xs={8} className="wide-right">
            {monsterToggleButton}
          </Col>
          <Col xs={4} className="wide-left">
            { this.isDisplayActiveOnly() ? monsterKillButton : monsterLevelButton }
          </Col>
        </Row>
        <Row>
          <Col xs={8} className="wide-right">
            {monsterHealthProgressBar}
          </Col>
          <Col xs={2} className="wide-both">
            {monsterTakeDamageButton}
          </Col>
          <Col xs={2} className="wide-left">
            {monsterHealButton}
          </Col>
        </Row>
      </Col>
    );
  }

  isDisplayActiveOnly() {
    return this.state.displayMonsterType === "ACTIVE";
  }

  makeDisplayedMonsterSections() {
    let displayedMonstersData = [];
    let displayedMonstersHTML = [];

    // find which monsters to display
    if (this.isDisplayActiveOnly()) {
      displayedMonstersData = this.getAllActiveMonsters();
    }
    else {
      displayedMonstersData = this.state.game.monsterHealth.monsters[this.state.displayMonsterType];
    }

    // ensure that monsters are sorted alphabetically by name and then by their number
    displayedMonstersData.sort(function(a, b) {
      let aName = a.name.toLowerCase();
      let bName = b.name.toLowerCase();

      if (aName < bName) {return -1;}
      if (aName > bName) {return 1;}
      if (a.number < b.number) {return -1;}
      if (a.number > b.number) {return 1;}
      return 0;
    });

    for (let i=0; i<displayedMonstersData.length; i++) {
      let monsterToDisplay = displayedMonstersData[i];

      displayedMonstersHTML.push(this.makeDisplayedMonsterSection(monsterToDisplay));
    }

    return displayedMonstersHTML;
  }

  getScenarioDetails(scenario) {
    return MONSTER_STATS.SCENARIO_MONSTERS[scenario];
  }

  scenarioGo() {
    let gameCopy = this.state.game;

    // first clear all existing monsters
    gameCopy.monsterHealth.monsters = {};

    // find all the monster types that are in this scenario by default
    let scenarioDetails = this.getScenarioDetails(gameCopy.monsterHealth.scenario - 1); // array starts with scenario 1 at first index, so use -1

    let monsterNames = [];
    for (let i=0; i<scenarioDetails.decks.length; i++) {
      monsterNames.push(scenarioDetails.decks[i].name);
    }

    for (let i=0; i<monsterNames.length; i++) {
      let monsterName = monsterNames[i];

      // find the monsters stats in the data structure
      let monsterType = this.getMonsterType(monsterName);

      let monsters = [];

      for (let j=0; j<monsterType.standeeCount; j++) {
        // add a monster record to the data structure
        monsters.push({
          name: monsterName,
          number: j + 1,
          elite: false,
          level: gameCopy.monsterHealth.defaultScenarioLevel,
          alive: false,
          damage: 0,
          statusTokens: []
        });
      }

      gameCopy.monsterHealth.monsters[monsterName] = monsters;
    }

    this.setState({
      game: gameCopy,
      displayMonsterType: "ACTIVE"
    }, function() {
      GameActions.changeGame(this.state.game);
    });
  }

  createMonsterHeaderButton(monsterName) {
    return (
      <Col xs={12} md={3} key={monsterName}>
        <Button onClick={() => this.showMonsters(monsterName)} className="btn-lightning" block>{monsterName}</Button>
      </Col>
    );
  }

  createMonsterHeaderActiveButton() {
    return (
      <Col xs={12} md={3} key={"active"}>
        <Button onClick={() => this.showActiveMonsters()} className="btn-scoundrel" block>All Active</Button>
      </Col>
    );
  }

  showActiveMonsters() {
    this.setState({
      displayMonsterType: "ACTIVE"
    });
  }

  showMonsters(monsterName) {
    this.setState({
      displayMonsterType: monsterName
    });
  }

  createScenarioLevelButton(value, activeValue) {
    return (
      <Col xs={1} md={1} key={value}>
        <Button onClick={() => this.levelButtonClick(value)} className={activeValue === value ? "btn-doomstalker" : ""} block>{value}</Button>
      </Col>
    );
  }

  createNumCharactersButton(value, activeValue) {
    return (
      <Col xs={1} md={1} key={value}>
        <Button onClick={() => this.numCharactersButtonClick(value)} className={activeValue === value ? "btn-doomstalker" : ""} block>{value}</Button>
      </Col>
    );
  }

  levelButtonClick(value) {
    let gameCopy = this.state.game;
    gameCopy.monsterHealth.defaultScenarioLevel = value;

    this.updateGame(gameCopy);
  }

  numCharactersButtonClick(value) {
    let gameCopy = this.state.game;
    gameCopy.monsterHealth.defaultNumPlaying = value;

    this.updateGame(gameCopy);
  }

  killMonster(monster) {
    let gameCopy = this.state.game;

    let monsterIndex = monster.number - 1;

    gameCopy.monsterHealth.monsters[monster.name][monsterIndex].alive = false;
    gameCopy.monsterHealth.monsters[monster.name][monsterIndex].damage = 0;
    gameCopy.monsterHealth.monsters[monster.name][monsterIndex].statusTokens = [];

    this.updateGame(gameCopy);

    this.closeConfirmKillMonster();
  }

  changeMonsterScenarioLevel(monster) {
    let gameCopy = this.state.game;
    let monsterIndex = monster.number - 1;

    let newLevel = gameCopy.monsterHealth.monsters[monster.name][monsterIndex].level + 1;
    newLevel %= 8;

    gameCopy.monsterHealth.monsters[monster.name][monsterIndex].level = newLevel;

    this.updateGame(gameCopy);
  }

  changeMonsterDamage(monster, damageAmount) {
    let gameCopy = this.state.game;
    
    let monsterLevelStats = this.getMonsterLevelStats(monster);
    let monsterType = this.getMonsterType(monster.name);
    let monsterIndex = monster.number - 1;
    let damage = monster.damage + damageAmount;

    let health = 0;
    if (monsterType.isBoss) {
      health = monsterLevelStats.health;
    }
    else {
      if (monster.elite) {
        health = monsterLevelStats.elite.health;
      }
      else {
        health = monsterLevelStats.normal.health; 
      }
    }

    if (damage >= health) {
      damage = health;
    }
    else if (damage < 0) {
      damage = 0;
    }

    if (gameCopy.monsterHealth.monsters[monster.name][monsterIndex].damage !== damage) {
      gameCopy.monsterHealth.monsters[monster.name][monsterIndex].damage = damage;

      this.updateGame(gameCopy);
    }
  }

  toggleStatusToken(statusToken, monster) {
    let gameCopy = this.state.game;

    // for backwards compatibility
    if (!monster.statusTokens) {
      monster.statusTokens = [];
    }

    let index = monster.statusTokens.indexOf(statusToken);
    if (index >= 0) {
      // remove this status token from monster
      monster.statusTokens.splice(index, 1);
    }
    else {
      // add this status token to monster
      monster.statusTokens.push(statusToken);
    }

    this.updateGame(gameCopy);
  }

  toggleMonster(monster) {
    let gameCopy = this.state.game;

    let monsterType = this.getMonsterType(monster.name);
    let monsterIndex = monster.number - 1;

    if (this.isDisplayActiveOnly()) {
      // if we're display all active monsters, then this button displays the status tokens popup
      this.setState({
        statusTokenPopup: monster
      });
    }
    else {
      // if we're displaying only monsters of a particular type, then this button toggles between normal/elite/summon/dead

      if (monsterType.isBoss) {
        // boss monster: dead -> alive (normal) -> dead -> ...

        if (!monster.alive) {
          // dead -> alive (normal)
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].alive = true;
        }
        else {
          // alive (normal) -> dead
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].alive = false;
        }
      }
      else {
        // regular monster: dead -> alive (normal) -> alive (elite) -> alive (normal, summon) -> alive (elite, summon) -> dead -> ...

        if (!monster.alive) {
          // dead -> alive (normal)
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].alive = true;
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].elite = false;
        }
        else if (!monster.elite && !monster.summon) {
          // alive (normal) -> alive (elite)
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].elite = true;
        }
        else if (monster.elite && !monster.summon) {
          // alive (elite) -> alive (normal, summon)
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].elite = false;
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].summon = true;
        }
        else if (!monster.elite && monster.summon) {
          // alive (normal, summon) -> alive (elite, summon)
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].elite = true;
        }
        else {
          // alive (elite, summon) -> dead
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].alive = false;
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].elite = false;
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].summon = false;
          gameCopy.monsterHealth.monsters[monster.name][monsterIndex].damage = 0;
        }
      }
    }

    this.updateGame(gameCopy);
  }

  updateGame(gameCopy) {
    this.setState({
      game: gameCopy
    }, function() {
      GameActions.changeGame(this.state.game);
    });
  }

  closeStatusTokenPopup() {
    this.setState({
      statusTokenPopup: ""
    });
  }

  makeStatusTokenButtons() {
    let buttons = [];

    if (this.state.statusTokenPopup === "") {
      return buttons;
    }

    let statusTokens = ["statusEffectStun", "statusEffectDisarm", "statusEffectImmobilize", "statusEffectPoison", "statusEffectWound", "statusEffectMuddle", "statusEffectStrengthen", "statusEffectInvisible"];

    for (let i=0; i< statusTokens.length; i++) {
      let statusToken = statusTokens[i];

      buttons.push(
        <Col key={i} xs={4} md={3}>
          <Button block onClick={() => this.toggleStatusToken(statusToken, this.state.statusTokenPopup)} className={this.state.statusTokenPopup.statusTokens && this.state.statusTokenPopup.statusTokens.indexOf(statusToken) >= 0 ? "btn-doomstalker" : ""}>
            <GloomhavenIcon icon={statusToken} width={iconWidth} />
          </Button>
        </Col>
      );
    }

    return buttons;
  }

  showScenarioChooser() {
    this.setState({
      showScenarioChooser: true
    });
  }

  showMonsterChooser() {
    this.setState({
      showMonsterChooser: true
    });
  }

  closeScenarioChooser() {
    this.setState({
      showScenarioChooser: false
    });
  }

  closeConfirmKillMonster() {
    this.setState({
      confirmKillMonster: null
    });
  }


  showConfirmKillMonster(monster) {
    this.setState({
      confirmKillMonster: monster
    });
  }

  closeMonsterChooser() {
    this.setState({
      showMonsterChooser: false
    });
  }

  makeScenarioChooserButtons() {
    let buttons = [];

    for (let i=1; i<=95; i++) {
      buttons.push(this.makeScenarioChooserButton(i, i));
    }

    return buttons;
  }

  makeKickstarterScenarioChooserButtons() {
    let buttons = [];

    for (let i=96; i<=105; i++) {
      buttons.push(this.makeScenarioChooserButton('K' + (i-95), i));
    }

    return buttons;
  }

  makeSoloScenarioChooserButtons() {
    let buttons = [];

    for (let i=106; i<=122; i++) {
      buttons.push(this.makeScenarioChooserButton('S' + (i-105), i));
    }

    return buttons;
  }

  makeScenarioChooserButton(buttonText, scenarioNumber) {
    return(
      <Col xs={2} key={scenarioNumber}>
        <Button block className="btn-doomstalker btn-scenario-chooser" onClick={() => this.chooseScenario(scenarioNumber)}>{buttonText}</Button>
      </Col>
    );
  }

  chooseScenario(scenarioNumber) {
    let gameCopy = this.state.game;
    gameCopy.monsterHealth.scenario = scenarioNumber;
    this.updateGame(gameCopy);

    this.scenarioGo();

    this.closeScenarioChooser();
  }

  render() {
    let scenarioLevelButtons = [];

    for (let i=0; i<=7; i++) {
      scenarioLevelButtons.push(this.createScenarioLevelButton(i, this.state.game.monsterHealth.defaultScenarioLevel));
    }

    let numCharactersButtons = [];

    for (let i=2; i<=4; i++) {
        numCharactersButtons.push(this.createNumCharactersButton(i, this.state.game.monsterHealth.defaultNumPlaying));
    }

    let monsterHeaderButtons = [];

    for (let monsterNameProperty in this.state.game.monsterHealth.monsters) {
      if (this.state.game.monsterHealth.monsters.hasOwnProperty(monsterNameProperty)) {
          monsterHeaderButtons.push(this.createMonsterHeaderButton(monsterNameProperty));
      }
    }

    monsterHeaderButtons.push(this.createMonsterHeaderActiveButton());

    let displayedMonsterSections = this.makeDisplayedMonsterSections();

    let statusTokenButtons = this.makeStatusTokenButtons();

    let scenarioChooserButtons = this.makeScenarioChooserButtons();
    let kickstarterScenarioChooserButtons = this.makeKickstarterScenarioChooserButtons();
    let soloScenarioChooserButtons = this.makeSoloScenarioChooserButtons();

    return (
      <div className="container">
        <Modal id="modal" show={this.state.statusTokenPopup !== ""} onHide={() => this.closeStatusTokenPopup()}>
          <Modal.Header closeButton>
            <Modal.Title>Status Effects for {this.state.statusTokenPopup.name} {this.state.statusTokenPopup.number}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="status-token-buttons row">
              {statusTokenButtons}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-lightning" onClick={() => this.closeStatusTokenPopup()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal id="modal" show={this.state.showScenarioChooser} onHide={() => this.closeScenarioChooser()}>
          <Modal.Header closeButton>
            <Modal.Title>Choose Scenario</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12}>
                <span>Warning: selecting a new scenario will wipe all unsaved existing monster health data.</span>
              </Col>
            </Row>
            <hr/>
            <Row className="scenario-chooser-container">
              {scenarioChooserButtons}
            </Row>
            <hr/>
            <Row className="scenario-chooser-container">
              {kickstarterScenarioChooserButtons}
            </Row>
            <hr/>
            <Row className="scenario-chooser-container">
              {soloScenarioChooserButtons}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-lightning" onClick={() => this.closeScenarioChooser()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal id="modal" show={this.state.showMonsterChooser} onHide={() => this.closeMonsterChooser()}>
          <Modal.Header closeButton>
            <Modal.Title>Choose Monsters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              Coming soon...
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-lightning" onClick={() => this.closeMonsterChooser()}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal id="modal" show={this.state.confirmKillMonster && this.state.confirmKillMonster !== null} onHide={() => this.closeConfirmKillMonster()}>
          <Modal.Header closeButton>
            <Modal.Title>Kill Monster</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col xs={12}>
                <span>Are you sure you want to kill this monster?</span>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <Button block className="btn-scoundrel" onClick={() => this.killMonster(this.state.confirmKillMonster)}>Kill</Button>
              </Col>
              <Col xs={6}>
                <Button block className="btn-lightning" onClick={() => this.closeConfirmKillMonster()}>Cancel</Button>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {/*<Button className="btn-lightning" onClick={() => this.closeConfirmKillMonster()}>Close</Button>*/}
          </Modal.Footer>
        </Modal>

      	<Grid>
          <Row className="monster-health-row">
            <Col xs={12} md={4}>
              Default Scenario Level
            </Col>
            {scenarioLevelButtons}
          </Row>
          {this.state.game.monsterHealth.defaultScenarioLevel > -1 &&
            <Row className="monster-health-row">
              <Col xs={12} md={4}>
                Num Characters Playing
              </Col>
                {numCharactersButtons}
            </Row>
          }
          {this.state.game.monsterHealth.defaultScenarioLevel > -1 && this.state.game.monsterHealth.defaultNumPlaying > -1 &&
            <Row className="monster-health-row">
              <Col xs={12} md={4}>
                Scenario
              </Col>
              <Col xs={12} md={4}>
                <Button className="btn-scoundrel" block onClick={() => this.showScenarioChooser()}>Choose Scenario</Button>
              </Col>
              <Col xs={12} md={4}>
                <Button className="btn-scoundrel" block onClick={() => this.showMonsterChooser()}>Choose Monster Types</Button>
              </Col>
            </Row>
          }
          {this.state.game.monsterHealth.scenario > -1 &&
            <Row className="monster-health-row">
              {monsterHeaderButtons}
            </Row>
          }
          <Row className="monster-heath-monsters-container">
            {displayedMonsterSections}
          </Row>
          <hr/>
          <Row className="monster-health-row">
            <Col xs={12} md={12}>
              <p><strong>How to use:</strong></p>
              <ol>
                <li>Select scenario level</li>
                <li>Enter scenario number (Kickstarter scenarios are numbers 96 to 105; solo scenarios are numbers 106 to 122)</li>
                <li>Press the <strong>Reset</strong> button</li>
                <li>
                  To create monsters, press on the desired monster type
                  <ul>
                    <li>Each monster name has a number - this is the standee that it refers to</li>
                    <li>Tapping on the monster name will toggle between dead/normal/elite and whether or not the monster is a summon (represented by an asterix: *)</li>
                    <li>The individual scenario level for each monster is displayed to the right of the name (you can tap this to change it per monster)</li>
                    <li>Starting health will be the monster's health according to their level</li>
                  </ul>
                </li>
                <li>When you're done creating monsters, press the <strong>All Active</strong> button to show only monsters that are on the board</li>
                <li>The blue buttons control the monsters remaining health</li>
                <li>When viewing <strong>All Active monsters</strong>, pressing the monsters name will allow you to toggle the <strong>status effects</strong> applied to that monster</li>
                <li>When a monster is dead, press the <strong>Kill Monster</strong> button to remove them from the active list</li>
              </ol>
            </Col>
          </Row>
      	</Grid>
      </div>
    );
  }
}

export default MonsterHealthComponent;