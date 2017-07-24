import React from 'react';
import StatusLayer from '../components/StatusLayer.jsx';
import io from 'socket.io-client';

class GameContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultCenter: {lat: 59.95, lng: 30.33},
      defaultZoom: 3,
      currentZoom: null,
      centerLat: null,
      centerLng: null,
      player: null,
      playerLat: null,
      playerLng: null,
      tempName: null,
      scry: false
    }

    this.socket = io();
    this.socket.on('attack', this.receiveAttack.bind(this));

    this.getPlayerName = this.getPlayerName.bind(this);
    this.submitPlayerName = this.submitPlayerName.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onMapChange = this.onMapChange.bind(this);
    this.submitOrb = this.submitOrb.bind(this);
    this.placePlayer = this.placePlayer.bind(this);
    this.checkPanorama = this.checkPanorama.bind(this);
    this.submitScry = this.submitScry.bind(this);
  }

  receiveAttack(attackDetails) {
    console.log("attack received!", attackDetails);
  }

  checkPanorama(data, status) {
    if(status == 'OK') {

      console.log("checkPanorama OK!");

      this.setState({
        playerLat: data.location.latLng.lat(),
        playerLng: data.location.latLng.lng()
      })
    }
  }

  placePlayer(obj, radius) {
    var streetView = new google.maps.StreetViewService();
    streetView.getPanorama({
      location: new google.maps.LatLng(obj.lat, obj.lng),
      radius: radius
    }, this.checkPanorama);

  }

  onMapClick(obj) {
    // console.log("onMapClick obj.x", obj.x);
    // console.log("onMapClick obj.y", obj.y);
    // console.log("onMapClick obj.lat", obj.lat);
    // console.log("onMapClick obj.lng", obj.lng);
    // console.log("onMapClick obj.event", obj.event);

    if(!this.state.playerLat && this.state.player) {
      this.placePlayer(obj, 500000);
      this.placePlayer(obj, 5000);
      this.placePlayer(obj, 50);
    }
  }

  onMapChange(obj) {
    // console.log("Map center", obj.center);
    // console.log("Zoom", obj.zoom);
    // console.log("bounds", obj.bounds);
    // console.log("marginBounds", obj.marginBounds);

    this.setState({currentZoom: obj.zoom});
    this.setState({centerLat: obj.center.lat});
    this.setState({centerLng: obj.center.lng});

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

  getDistanceFromLatLngInKm(lat1,lng1,lat2,lng2) {
    var R = 6371;
    var dLat = this.degreeToRadian(lat2-lat1);
    var dLng = this.degreeToRadian(lng2-lng1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(this.degreeToRadian(lat1)) * Math.cos(this.degreeToRadian(lat2)) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  }

  degreeToRadian(deg) {
    return deg * (Math.PI/180)
  }

  submitOrb(event) {
    event.preventDefault();

    let attackDetails = {
      attackingPlayer: this.state.player,
      attackZoom: this.state.currentZoom,
      attackCenter: {attackLat: this.state.centerLat, attackLng: this.state.centerLng}
    }

    this.socket.emit('attack', attackDetails);
  }




  // submitOrb(event) {
  //   event.preventDefault();
  //
  //   const range = this.getDistanceFromLatLngInKm(this.state.playerLat, this.state.playerLng, this.state.centerLat, this.state.centerLng)
  //
  //   console.log("Range", range);
  //
  //   let spellRange = 0;
  //   let damage = 0;
  //
  //   switch(this.state.currentZoom) {
  //     case 3:
  //       spellRange = 2516;
  //       damage = 1;
  //       break;
  //     case 4:
  //       spellRange = 1385;
  //       damage = 2;
  //       break;
  //     case 5:
  //       spellRange = 727.25;
  //       damage = 4;
  //       break;
  //     case 6:
  //       spellRange = 371.25;
  //       damage = 8;
  //       break;
  //     case 7:
  //       spellRange = 188;
  //       damage = 16;
  //       break;
  //     case 8:
  //       spellRange = 94.5;
  //       damage = 32;
  //       break;
  //     case 9:
  //       spellRange = 47.5;
  //       damage = 64;
  //       break;
  //     case 10:
  //       spellRange = 23.75;
  //       damage = 128;
  //       break;
  //     case 11:
  //       spellRange = 12;
  //       damage = 256;
  //       break;
  //     case 12:
  //       spellRange = 6;
  //       damage = 512;
  //       break;
  //     case 13:
  //       spellRange = 3;
  //       damage = 1024;
  //       break;
  //     case 14:
  //       spellRange = 1.5;
  //       damage = 2048;
  //       break;
  //     case 15:
  //       spellRange = 0.75;
  //       damage = 4096;
  //       break;
  //     case 16:
  //       spellRange = 0.37;
  //       damage = 8192;
  //       break;
  //     default:
  //     console.log("Nuthin");
  //   }
  //
  //   if(range <= spellRange) {
  //     console.log("Hit! For:", damage);
  //   }
  // }


  submitScry(event) {
    event.preventDefault();
    console.log("submitScry clicked");
    var currentScryStatus = this.state.scry;
    // var panoramaDiv = document.getElementById("scry-panorama");

    if(!currentScryStatus) {
      this.setState({scry: true})



      // panoramaDiv.style.display = "block";

    } else {
      this.setState({scry: false})
      // panoramaDiv.style.display = "none";

    }
  }

  render() {
    return(
      <div>
        <h1>Wizard BATTLE</h1>
        <StatusLayer
          defaultCenter={this.state.defaultCenter}
          defaultZoom={this.state.defaultZoom}
          onMapChange={this.onMapChange}
          onMapClick={this.onMapClick}
          player={this.state.player}
          playerLat={this.state.playerLat}
          playerLng={this.state.playerLng}
          submitPlayerName={this.submitPlayerName}
          getPlayerName={this.getPlayerName}
          submitOrb={this.submitOrb}
          submitScry={this.submitScry}
          scryStatus={this.state.scry}
          currentZoom={this.state.currentZoom}
          centerLat={this.state.centerLat}
          centerLng={this.state.centerLng}
        />
      </div>
    )
  }
}




export default GameContainer;
