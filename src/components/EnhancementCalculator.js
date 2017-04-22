import React, { Component } from 'react';
import { Grid, Row, Col, Button, Label } from 'react-bootstrap';
import GloomhavenIcon from '../components/utils/GloomhavenIcon';

const iconWidth = "17px";

const playerPlusOneAbilityLines = {
  move: { cost: 30, title: "Move", icon: "generalMove" },
  attack: { cost: 50, title: "Attack", icon: "generalAttack" },
  range: { cost: 30, title: "Range", icon: "generalRange" },
  shield: { cost: 100, title: "Shield", icon: "generalShield" },
  push: { cost: 30, title: "Push", icon: "statusEffectPush" },
  pull: { cost: 30, title: "Pull", icon: "statusEffectPull" },
  pierce: { cost: 30, title: "Pierce", icon: "statusEffectPierce" },
  retaliate: { cost: 100, title: "Retaliate", icon: "generalRetaliate" },
  heal: { cost: 30, title: "Heal", icon: "generalHeal" },
  target: { cost: 50, title: "Target", icon: "generalTarget" },
};

const summonPlusOneAbilityLines = {
  move: { cost: 100, title: "Move", icon: "generalMove" },
  attack: { cost: 100, title: "Attack", icon: "generalAttack" },
  range: { cost: 50, title: "Range", icon: "generalRange" },
  hp: { cost: 50, title: "HP", icon: "generalHeal" },
};

const baseOtherEffects = {
  poison: { cost: 75, title: "Poison", icon: "statusEffectPoison" },
  wound: { cost: 75, title: "Wound", icon: "statusEffectWound" },
  muddle: { cost: 50, title: "Muddle", icon: "statusEffectMuddle" },
  immobilize: { cost: 100, title: "Immobilize", icon: "statusEffectImmobilize" },
  disarm: { cost: 150, title: "Disarm", icon: "statusEffectDisarm" },
  curse: { cost: 75, title: "Curse", icon: "statusEffectCurse" },
  strengthen: { cost: 50, title: "Strengthen", icon: "statusEffectStrengthen" },
  bless: { cost: 50, title: "Bless", icon: "statusEffectBless" },
  jump: { cost: 50, title: "Jump", icon: "generalJump" },
  anyElement: { cost: 150, title: "Any Element", icon: "elementAll" },
  specificElement: { cost: 100, title: "Specific Element", icon: "elementFire" },
};

const stickerTypes = {
  playerPlus1: { title: "Player +1" },
  summonPlus1: { title: "Summon +1" },
  attackHex: { title: "Attack Hex" },
  otherEffect: { title: "Other Effect" },
};

const levelCost = [0, 25, 50, 75, 100, 125, 150, 175, 200];
const previousEnhancementCost = [0, 75, 150, 225];

class EnhancementCalculatorComponent extends Component {

  constructor() {
    super();

    this.state = {
      stickerType: "", // +1 / summon +1 / attack hex / else
      playerPlusOneAbility: "",
      baseOtherEffect: "",
      summonPlusOneAbility: "",
      numberOfCurrentlyTargetedHexes: 2,
      levelOfAbilityCard: 1,
      numberOfPreviousEnhancements: 0,
      multipleTargets: false
    }
  }

  calculateCost() {
    let cost = 0;

    if (this.state.stickerType === "playerPlus1") {
      if (this.state.playerPlusOneAbility) {
        cost += playerPlusOneAbilityLines[this.state.playerPlusOneAbility].cost;
      }
      else {
        // cannot yet calculate
        return 0;
      }
    }
    else if (this.state.stickerType === "summonPlus1") {
      if (this.state.summonPlusOneAbility) {
        cost += summonPlusOneAbilityLines[this.state.summonPlusOneAbility].cost;
      }
      else {
        // cannot yet calculate
        return 0;
      }
    }
    else if (this.state.stickerType === "attackHex") {
      cost += Math.floor( 200 / this.state.numberOfCurrentlyTargetedHexes );
    }
    else if (this.state.stickerType === "otherEffect") {
      if (this.state.baseOtherEffect) {
        cost += baseOtherEffects[this.state.baseOtherEffect].cost;
      }
      else {
        // cannot yet calculate
        return 0;
      }
    }
    else {
      // no legal option selected
      return 0;
    }

    // double BASE COST if multiple targets (does not apply for attack hex)
    if (this.state.multipleTargets && this.state.stickerType !== "attackHex") {
      cost = cost * 2;
    }

    // extra cost for level of ability card
    cost = cost + levelCost[this.state.levelOfAbilityCard - 1];

    // extra cost for previous enhancements to the same action
    cost = cost + previousEnhancementCost[this.state.numberOfPreviousEnhancements];

    return cost;
  }

  stickerTypeClick(stickerType) {
    if (this.state.stickerType === stickerType) {
      this.setState({
        stickerType: ""
      });
    }
    else {
      this.setState({
        stickerType: stickerType
      });      
    }
  }

  summonPlusOneAbilityClick(effect) {
    if (this.state.summonPlusOneAbility === effect) {
      this.setState({
        summonPlusOneAbility: ""
      });
    }
    else {
      this.setState({
        summonPlusOneAbility: effect
      });  
    }
  }

  baseOtherEffectClick(effect) {
    if (this.state.baseOtherEffect === effect) {
      this.setState({
        baseOtherEffect: ""
      });
    }
    else {
      this.setState({
        baseOtherEffect: effect
      });  
    }
  }

  playerPlusOneAbilityClick(abilityLine) {
    if (this.state.playerPlusOneAbility === abilityLine) {
      this.setState({
        playerPlusOneAbility: ""
      });
    }
    else {
      this.setState({
        playerPlusOneAbility: abilityLine
      });  
    }
  }

  levelClick(level) {
    this.setState({
      levelOfAbilityCard: level
    });
  }

  numberOfHexesClick(hexes) {
    this.setState({
      numberOfCurrentlyTargetedHexes: hexes
    });
  }

  previousEnhancementClick(number) {
    this.setState({
      numberOfPreviousEnhancements: number
    });
  }

  multipleTargetClick() {
    this.setState({
      multipleTargets: !this.state.multipleTargets
    }); 
  }

  showOtherOptions() {
    if (this.state.stickerType === "playerPlus1") {
      if (this.state.playerPlusOneAbility) {
        return true;
      }
    }
    else if (this.state.stickerType === "summonPlus1") {
      if (this.state.summonPlusOneAbility) {
        return true;
      }
    }
    else if (this.state.stickerType === "attackHex") {
      return true;
    }
    else if (this.state.stickerType === "otherEffect") {
      if (this.state.baseOtherEffect) {
        return true;
      }
    }

    return false;
  }

  makeLabelRow(text) {
    return (
      <Row>
        <Col xs={12} md={12} className="text-center instruction-label">
          {text}
        </Col>
      </Row>
    );
  }

  render() {
    let cost = this.calculateCost();

    let enhancementTypeColumns = [];
    let playerPlusOneAbilityColumns = [];
    let baseOtherEffectColumns = [];
    let summonPlusOneAbilityColumns = [];
    let abilityCardLevelColumns = [];
    let previousEnhancementsColumns = [];
    let numberOfHexesColumns = [];

    for (let i=2; i<=9; i++) {
      numberOfHexesColumns.push(
        <Col className="enhancement-col" key={i} xs={4} md={3}>
          <Button block onClick={() => this.numberOfHexesClick(i)} className={this.state.numberOfCurrentlyTargetedHexes === i && "btn-selected-light"}>
            {i} <GloomhavenIcon icon="generalAttackHex" width={iconWidth} /> ({Math.floor( 200 / i )}g)
          </Button>
        </Col>
      );
    }

    for (let i=0; i<=3; i++) {
      previousEnhancementsColumns.push(
        <Col className="enhancement-col" key={i} xs={6} md={3}>
          <Button block onClick={() => this.previousEnhancementClick(i)} className={this.state.numberOfPreviousEnhancements === i && "btn-selected-light"}>
            {i} (+{previousEnhancementCost[i]}g)
          </Button>
        </Col>
      );
    }

    for (let i=1; i<=9; i++) {
      abilityCardLevelColumns.push(
        <Col className="enhancement-col" key={i} xs={4} md={2} lg={1}>
          <Button block onClick={() => this.levelClick(i)} className={this.state.levelOfAbilityCard === i && "btn-selected-light"}>
            {i} (+{levelCost[i-1]}g)
          </Button>
        </Col>
      );
    }

    for (let stickerType in stickerTypes) {
      if (stickerTypes.hasOwnProperty(stickerType)) {
        let type = stickerTypes[stickerType];
        
        let icons = "";
        if (stickerType === "attackHex") {
          icons = <GloomhavenIcon icon="generalAttackHex" width={iconWidth} />
        }
        else if (stickerType === "otherEffect") {
          icons = (
            <span>
              <GloomhavenIcon icon="elementFire" width={iconWidth} />
              <GloomhavenIcon icon="generalJump" width={iconWidth} />
              <GloomhavenIcon icon="statusEffectMuddle" width={iconWidth} />
            </span>
          )
        }

        enhancementTypeColumns.push(
          <Col className="enhancement-col" key={stickerType} xs={6} md={3}>
            <Button block onClick={() => this.stickerTypeClick(stickerType)} className={this.state.stickerType === stickerType && "btn-selected-light"}>
              {type.title} {icons}
            </Button>
          </Col>
        );
      }
    }

    for (let baseOtherEffect in baseOtherEffects) {
      if (baseOtherEffects.hasOwnProperty(baseOtherEffect)) {
        let effect = baseOtherEffects[baseOtherEffect];
        let xs = 6;
        if (baseOtherEffect === "specificElement" || baseOtherEffect === "anyElement" || baseOtherEffect === "jump") {
          xs = 12;
        }


        baseOtherEffectColumns.push(
          <Col className="enhancement-col" key={baseOtherEffect} xs={xs} md={3}>
            <Button block onClick={() => this.baseOtherEffectClick(baseOtherEffect)} className={this.state.baseOtherEffect === baseOtherEffect && "btn-selected-light"}>
              {effect.title} <GloomhavenIcon icon={effect.icon} width={iconWidth} /> ({effect.cost}g)
            </Button>
          </Col>
        );
      }
    }

    for (let playerPlusOneAbilityLine in playerPlusOneAbilityLines) {
      if (playerPlusOneAbilityLines.hasOwnProperty(playerPlusOneAbilityLine)) {
        let ability = playerPlusOneAbilityLines[playerPlusOneAbilityLine];

        playerPlusOneAbilityColumns.push(
          <Col className="enhancement-col" key={playerPlusOneAbilityLine} xs={4} md={2}>
            <Button block onClick={() => this.playerPlusOneAbilityClick(playerPlusOneAbilityLine)} className={this.state.playerPlusOneAbility === playerPlusOneAbilityLine && "btn-selected-light"}>
              {ability.title} <GloomhavenIcon icon={ability.icon} width={iconWidth} />
            </Button>
          </Col>
        );
      }
    }

    for (let summonPlusOneAbilityLine in summonPlusOneAbilityLines) {
      if (summonPlusOneAbilityLines.hasOwnProperty(summonPlusOneAbilityLine)) {
        let ability = summonPlusOneAbilityLines[summonPlusOneAbilityLine];

        summonPlusOneAbilityColumns.push(
          <Col className="enhancement-col" key={summonPlusOneAbilityLine} xs={4} md={2}>
            <Button block onClick={() => this.summonPlusOneAbilityClick(summonPlusOneAbilityLine)} className={this.state.summonPlusOneAbility === summonPlusOneAbilityLine && "btn-selected-light"}>
              {ability.title} <GloomhavenIcon icon={ability.icon} width={iconWidth} />
            </Button>
          </Col>
        );
      }
    }

    return (
      <div className="container">
      	<Grid className="enhancement-container">

          {this.makeLabelRow("Enhancement Type")}
          <Row>
            {enhancementTypeColumns}
          </Row>

          {this.state.stickerType === "playerPlus1" && 
            <div>
              <hr />
              {this.makeLabelRow("Ability Line")}
              <Row>
                {playerPlusOneAbilityColumns}
              </Row>
            </div>
          }

          {this.state.stickerType === "summonPlus1" && 
            <div>
              <hr />
              {this.makeLabelRow("Enhancement Effect")}
              <Row>
                {summonPlusOneAbilityColumns}
              </Row>
            </div>
          }

          {this.state.stickerType === "attackHex" && 
            <div>
              <hr />
              {this.makeLabelRow("Number of Hexes Currently Targeted with the Attack")}
              <Row>
                {numberOfHexesColumns}
              </Row>
            </div>
          }

          {this.state.stickerType === "otherEffect" && 
            <div>
              <hr />
              {this.makeLabelRow("Base Effect")}
              <Row>
                {baseOtherEffectColumns}
              </Row>
            </div>
          }

          {this.showOtherOptions() && 
            <div>
              <hr />
              {this.makeLabelRow("Level of Ability Card")}
              <Row>
                {abilityCardLevelColumns}
              </Row>
            </div>
          }

          {this.showOtherOptions() && 
            <div>
              <hr />
              {this.makeLabelRow("Number of Previous Enhancements to the Same Action")}
              <Row>
                {previousEnhancementsColumns}
              </Row>
            </div>
          }

          {this.showOtherOptions() && this.state.stickerType !== "attackHex" &&
            <div>
              <hr />
              {this.makeLabelRow("Ability has Multple Targets")}
              <Row>
                <Col className="enhancement-col" xs={12} md={12}>
                  <Button block onClick={() => this.multipleTargetClick()} className={this.state.multipleTargets && "btn-selected-light"}>{this.state.multipleTargets ? "Yes" : "No"} (Double base cost)</Button>
                </Col>
              </Row>
            </div>
          }

          <div>
            <hr />
            {this.makeLabelRow("Enhancement Cost")}
            <Row>
              <Col className="enhancement-col text-center" xs={12} md={12}>
                {cost <= 0 &&
                  <Label className="label-xxlarge label-brute">-</Label>
                }
                {cost > 0 &&
                  <Label className="label-xxlarge label-brute">{cost + " gold"}</Label>
                }
              </Col>
            </Row>
          </div>
      	</Grid>
      </div>
    );
  }
}

export default EnhancementCalculatorComponent;