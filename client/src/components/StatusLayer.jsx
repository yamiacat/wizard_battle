import React from 'react';
import MagicLayer from './MagicLayer.jsx'
import PlayerWelcome from './PlayerWelcome.jsx';

class StatusLayer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(!this.props.player || !this.props.playerLocation) {
      var gameStatus = "Welcome Player";
      var welcome = <PlayerWelcome
        player={this.props.player}
        submitPlayerName={this.props.submitPlayerName}
        getPlayerName={this.props.getPlayerName}
      />
    } else if (this.props.player && this.props.playerLocation) {
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
          onMapClick={this.props.onMapClick}
          >
          ></MagicLayer>
      </div>
    )
  }
}


export default StatusLayer;
