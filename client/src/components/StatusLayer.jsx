import React from 'react';
import MagicLayer from './MagicLayer.jsx'
import PlayerWelcome from './PlayerWelcome.jsx';
import {OrbSpell} from './OrbSpell.jsx';
import {OtherPlayers} from './OtherPlayers.jsx';
import {OrbCast} from './OrbCast.jsx';
import {ScryCast} from './ScryCast.jsx';

class StatusLayer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let gameStatus;
    let activeComponent;
    let spellButton  = <div id="spell-buttons">
      <OrbCast
        submitOrb={this.props.submitOrb}
      />
      <ScryCast
        submitScry={this.props.submitScry}
      />
      </div>

    if(!this.props.player || !this.props.playerLat) {
      gameStatus = "Welcome Player";
      activeComponent = <PlayerWelcome
        player={this.props.player}
        submitPlayerName={this.props.submitPlayerName}
        getPlayerName={this.props.getPlayerName}
      />
      spellButton = null;
    } else if (this.props.player && this.props.playerLat && !this.props.scryStatus) {
      activeComponent = <OrbSpell
        chargeAnimation={this.props.chargeAnimation}
        damageAnimation={this.props.damageAnimation}
        hitSomething={this.props.hitSomething}
        damageCaused={this.props.damageCaused}
      />;
      gameStatus = `${this.props.player}, you have ${this.props.health} health`
    } else {
      gameStatus = `${this.props.player}, you have ${this.props.health} health`
    }

    let healthPercentage = (this.props.health/10)+"%";
    var healthLevel;

    if(this.props.health > 666) {
      healthLevel = {backgroundColor: 'limegreen',
        width: healthPercentage}
    } else if(this.props.health < 333 && this.props.health > 0) {
      healthLevel = {backgroundColor: 'red',
        width: healthPercentage}
    } else if(this.props.health <= 0) {
      healthLevel = {backgroundColor: 'red',
        width: healthPercentage}
      spellButton =  <div id="spell-buttons">
        <h1>YOU DED</h1>
      </div>
    } else {
      healthLevel = {backgroundColor: 'darkorange',
        width: healthPercentage}
    }

    let messages = this.props.attackMessages.map((message, index) => {
        return <li key={index}> {message} </li>
      });

    return(
      <div id="status-layer">
        <div id="game-status">
          <h1>Wizard BATTLE</h1>
          <h2>{gameStatus}</h2>
          <div id="health-bar">
            <div style={healthLevel} id="health-indicator"></div>
          </div>
          <div id="game-messages">
            <p>{this.props.gameMessage}</p>
            <ul>{messages}</ul>
          </div>
        </div>
        <div id="game-block">
          {activeComponent}
          <MagicLayer
            defaultCenter={this.props.defaultCenter}
            defaultZoom={this.props.defaultZoom}
            onMapChange={this.props.onMapChange}
            onMapClick={this.props.onMapClick}
            playerLat={this.props.playerLat}
            playerLng={this.props.playerLng}
            submitOrb={this.props.submitOrb}
            submitScry={this.props.submitScry}
            scryStatus={this.props.scryStatus}
            currentZoom={this.props.currentZoom}
            centerLat={this.props.centerLat}
            centerLng={this.props.centerLng}
            scryedPlayer={this.props.scryedPlayer}
            scryedLat={this.props.scryedLat}
            scryedLng={this.props.scryedLng}
            health={this.props.health}
            keyListen={this.props.keyListen}
            />
            <OtherPlayers
              otherPlayers={this.props.otherPlayers}
            />
        </div>
        {spellButton}
      </div>
    )
  }
}


export default StatusLayer;
