import React from 'react';
import MagicLayer from './MagicLayer.jsx'
import PlayerWelcome from './PlayerWelcome.jsx';
import {OrbSpell} from './OrbSpell.jsx';

class StatusLayer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(!this.props.player || !this.props.playerLat) {
      var gameStatus = "Welcome Player";
      var activeComponent = <PlayerWelcome
        player={this.props.player}
        submitPlayerName={this.props.submitPlayerName}
        getPlayerName={this.props.getPlayerName}
      />
    } else if (this.props.player && this.props.playerLat && !this.props.scryStatus) {
      activeComponent = <OrbSpell
        chargeAnimation={this.props.chargeAnimation}
        damageAnimation={this.props.damageAnimation}
        hitSomething={this.props.hitSomething}
        damageCaused={this.props.damageCaused}
      />;
      var gameStatus = `${this.props.player}, you have ${this.props.health} health`
    } else {
      var gameStatus = `${this.props.player}, you have ${this.props.health} health`
    }

    var healthPercentage = (this.props.health/10)+"%";

    if(this.props.health > 666) {
      var healthLevel = {backgroundColor: 'limegreen',
        width: healthPercentage}
    } else if(this.props.health < 333) {
      var healthLevel = {backgroundColor: 'red',
        width: healthPercentage}
    } else {
      var healthLevel = {backgroundColor: 'darkorange',
        width: healthPercentage}
    }

    var messages = this.props.attackMessages.map((message, index) => {
        return <li key={index}> {message} </li>
      });

    return(
      <div id="status-layer">
        <div id="game-status">
          <h2>{gameStatus}</h2>
          <div id="health-bar">
            <div style={healthLevel} id="health-indicator"></div>
          </div>
          <div id="game-messages">
            <p>{this.props.gameMessage}</p>
            <ul>{messages}</ul>
          </div>
        </div>
        <div id="other-players">

        </div>
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
      </div>
    )
  }
}


export default StatusLayer;
