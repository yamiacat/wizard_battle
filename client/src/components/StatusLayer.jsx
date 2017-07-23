import React from 'react';
import MagicLayer from './MagicLayer.jsx'
import PlayerWelcome from './PlayerWelcome.jsx';

class StatusLayer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(!this.props.player || !this.props.playerLat) {
      var gameStatus = "Welcome Player";
      var welcome = <PlayerWelcome
        player={this.props.player}
        submitPlayerName={this.props.submitPlayerName}
        getPlayerName={this.props.getPlayerName}
      />
    } else if (this.props.player && this.props.playerLat) {
      welcome = null;
      var gameStatus = `${this.props.player}`
    }

    return(
      <div>
        <h2>{gameStatus}</h2>
        {welcome}
        <MagicLayer
          defaultCenter={this.props.defaultCenter}
          defaultZoom={this.props.defaultZoom}
          onMapChange={this.props.onMapChange}
          onMapClick={this.props.onMapClick}
          playerLat={this.props.playerLat}
          playerLng={this.props.playerLng}
          >
          ></MagicLayer>
      </div>
    )
  }
}


export default StatusLayer;
