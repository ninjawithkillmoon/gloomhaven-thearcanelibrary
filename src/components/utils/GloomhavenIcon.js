import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import elementAir from '../../images/icons/elements/element-small-air.png';
import elementAll from '../../images/icons/elements/element-small-all.png';
import elementConsume from '../../images/icons/elements/element-small-consume.png';
import elementDark from '../../images/icons/elements/element-small-dark.png';
import elementEarth from '../../images/icons/elements/element-small-earth.png';
import elementFire from '../../images/icons/elements/element-small-fire.png';
import elementIce from '../../images/icons/elements/element-small-ice.png';
import elementLight from '../../images/icons/elements/element-small-light.png';

import statusEffectAddTarget from '../../images/icons/status-effect/status-effect-small-add-target.png';
import statusEffectBless from '../../images/icons/status-effect/status-effect-small-bless.png';
import statusEffectCurse from '../../images/icons/status-effect/status-effect-small-curse.png';
import statusEffectDisarm from '../../images/icons/status-effect/status-effect-small-disarm.png';
import statusEffectImmobilize from '../../images/icons/status-effect/status-effect-small-immobilize.png';
import statusEffectInvisible from '../../images/icons/status-effect/status-effect-small-invisible.png';
import statusEffectMuddle from '../../images/icons/status-effect/status-effect-small-muddle.png';
import statusEffectPierce from '../../images/icons/status-effect/status-effect-small-pierce.png';
import statusEffectPoison from '../../images/icons/status-effect/status-effect-small-poison.png';
import statusEffectPush from '../../images/icons/status-effect/status-effect-small-push.png';
import statusEffectPull from '../../images/icons/status-effect/status-effect-small-pull.png';
import statusEffectStrengthen from '../../images/icons/status-effect/status-effect-small-strengthen.png';
import statusEffectStun from '../../images/icons/status-effect/status-effect-small-stun.png';
import statusEffectWound from '../../images/icons/status-effect/status-effect-small-wound.png';

import generalAttack from '../../images/icons/general/general-small-attack.png';
import generalAttackHex from '../../images/icons/general/general-small-attack-hex.png';
import generalHeal from '../../images/icons/general/general-small-heal.png';
import generalJump from '../../images/icons/general/general-small-jump.png';
import generalLoot from '../../images/icons/general/general-small-loot.png';
import generalMove from '../../images/icons/general/general-small-move.png';
import generalRange from '../../images/icons/general/general-small-range.png';
import generalRetaliate from '../../images/icons/general/general-small-retaliate.png';
import generalShield from '../../images/icons/general/general-small-shield.png';
import generalTarget from '../../images/icons/general/general-small-target.png';
import generalPlusOne from '../../images/icons/general/general-small-plus-one.png';

const icons = {
  elementFire: elementFire
};

class GloomhavenIconComponent extends Component {

  findIcon() {
    switch(this.props.icon) {
      case "elementAir":
        return elementAir;
        break;
      case "elementAll":
        return elementAll;
        break;
      case "elementConsume":
        return elementConsume;
        break;
      case "elementDark":
        return elementDark;
        break;
      case "elementEarth":
        return elementEarth;
        break;
      case "elementFire":
        return elementFire;
        break;
      case "elementIce":
        return elementIce;
        break;
      case "elementLight":
        return elementLight;
        break;
      case "statusEffectAddTarget":
        return statusEffectAddTarget;
        break;
      case "statusEffectBless":
        return statusEffectBless;
        break;
      case "statusEffectCurse":
        return statusEffectCurse;
        break;
      case "statusEffectDisarm":
        return statusEffectDisarm;
        break;
      case "statusEffectImmobilize":
        return statusEffectImmobilize;
        break;
      case "statusEffectInvisible":
        return statusEffectInvisible;
        break;
      case "statusEffectMuddle":
        return statusEffectMuddle;
        break;
      case "statusEffectPierce":
        return statusEffectPierce;
        break;
      case "statusEffectPoison":
        return statusEffectPoison;
        break;
      case "statusEffectPush":
        return statusEffectPush;
        break;
      case "statusEffectPull":
        return statusEffectPull;
        break;
      case "statusEffectStrengthen":
        return statusEffectStrengthen;
        break;
      case "statusEffectStun":
        return statusEffectStun;
        break;
      case "statusEffectWound":
        return statusEffectWound;
        break;
      case "generalAttack":
        return generalAttack;
        break;
      case "generalAttackHex":
        return generalAttackHex;
        break;
      case "generalHeal":
        return generalHeal;
        break;
      case "generalJump":
        return generalJump;
        break;
      case "generalLoot":
        return generalLoot;
        break;
      case "generalMove":
        return generalMove;
        break;
      case "generalRange":
        return generalRange;
        break;
      case "generalRetaliate":
        return generalRetaliate;
        break;
      case "generalShield":
        return generalShield;
        break;
      case "generalTarget":
        return generalTarget;
      case "generalPlusOne":
        return generalPlusOne;
        break;
    }
  }

  render() {
    return (
      <img src={this.findIcon()} width={this.props.width} height={this.props.height} className="gloomhaven-icon-img" />
    );
  }
}

export default GloomhavenIconComponent;