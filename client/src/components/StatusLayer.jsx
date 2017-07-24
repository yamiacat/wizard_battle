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
      activeComponent = <OrbSpell/>;
      var gameStatus = `${this.props.player}`
    } else {
      var gameStatus = `${this.props.player}`
    }

    return(
      <div id="status-layer">
        <h2>{gameStatus}</h2>
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
          />
      </div>
    )
  }
}


export default StatusLayer;
