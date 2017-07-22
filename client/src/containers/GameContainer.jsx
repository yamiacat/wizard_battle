import React from 'react';
import StatusLayer from '../components/StatusLayer.jsx';

class GameContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultCenter: {lat: 59.95, lng: 30.33},
      defaultZoom: 1,
      player: null,
      playerLat: null,
      playerLng: null,
      tempName: null,
    }
    this.getPlayerName = this.getPlayerName.bind(this);
    this.submitPlayerName = this.submitPlayerName.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }



  onMapClick(obj) {
    console.log("onMapClick obj.x", obj.x);
    console.log("onMapClick obj.y", obj.y);
    console.log("onMapClick obj.lat", obj.lat);
    console.log("onMapClick obj.lng", obj.lng);
    console.log("onMapClick obj.event", obj.event);

    if(!this.state.playerLat && this.state.player) {
      this.setState({
        playerLat: obj.lat,
        playerLng: obj.lng
      })
    }

  }

  submitPlayerName(event) {
    event.preventDefault();

      var newName = this.state.tempName;
      this.setState({
        player: newName
      })
  }

  getPlayerName(event) {
    this.setState({
      tempName: event.target.value
    })
  }



  render() {
    return(
      <div>
        <h1>Wizard BATTLE</h1>
        <StatusLayer
          defaultCenter={this.state.defaultCenter}
          defaultZoom={this.state.defaultZoom}
          onMapClick={this.onMapClick}
          player={this.state.player}
          playerLat={this.state.playerLat}
          playerLng={this.state.playerLng}
          submitPlayerName={this.submitPlayerName}
          getPlayerName={this.getPlayerName}
          >
          </StatusLayer>
      </div>
    )
  }
}




export default GameContainer;
