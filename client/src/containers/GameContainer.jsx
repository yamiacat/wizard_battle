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
      health: 1000,
      playerLat: null,
      playerLng: null,
      tempName: null,
      scry: false,
      scryedLat: null,
      scryedLng: null,
      scryedPlayer: null,
      gameMessage: null,
      attackMessage: null,
      timedOut: false,
      chargeAnimation: {animationPlayState: 'paused'}
    }

    this.socket = io();
    this.socket.on('attack', this.receiveAttack.bind(this));
    this.socket.on('broadcast', this.receiveBroadcast.bind(this));
    this.socket.on('scryRequest', this.receiveScryRequest.bind(this));
    this.socket.on('scryTransmit', this.receiveScryTransmit.bind(this));


    this.getPlayerName = this.getPlayerName.bind(this);
    this.submitPlayerName = this.submitPlayerName.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onMapChange = this.onMapChange.bind(this);
    this.submitOrb = this.submitOrb.bind(this);
    this.placePlayer = this.placePlayer.bind(this);
    this.checkPanorama = this.checkPanorama.bind(this);
    this.submitScry = this.submitScry.bind(this);
    this.sufferDamage = this.sufferDamage.bind(this);
  }

  //SOCKET FUNCTIONS

  submitOrb(event) {
    event.preventDefault();

    if(this.state.timedOut === false) {
      this.setState({
        timedOut: true,
        chargeAnimation: {animationPlayState: 'running',
        animationName: 'charging'}
      })

      window.setTimeout(() => {this.setState(
        {chargeAnimation: {animationName: ''}})
        console.log("animationName", this.state.chargeAnimation);
        window.setTimeout(() => {this.setState(
          {timedOut: false,
            chargeAnimation: {animationPlayState: 'paused',
          animationName: 'charging'}}
          )


          console.log("animationName 2", this.state.chargeAnimation);
        }, 10);

      }, 2990);



        let attackDetails = {
          attackingPlayer: this.state.player,
          attackZoom: this.state.currentZoom,
          attackCenter: {attackLat: this.state.centerLat, attackLng: this.state.centerLng}
        }
        this.socket.emit('attack', attackDetails);
      }
    }

  receiveAttack(attackDetails) {

    if(attackDetails.attackingPlayer !== this.state.player) {

      const range = this.getDistanceFromLatLngInKm(this.state.playerLat, this.state.playerLng, attackDetails.attackCenter.attackLat, attackDetails.attackCenter.attackLng)

      let spellRange = 0;
      let damage = 0;

      switch(attackDetails.attackZoom) {
        case 3:
          spellRange = 2516;
          damage = 1;
          break;
        case 4:
          spellRange = 1385;
          damage = 2;
          break;
        case 5:
          spellRange = 727.25;
          damage = 4;
          break;
        case 6:
          spellRange = 371.25;
          damage = 8;
          break;
        case 7:
          spellRange = 188;
          damage = 16;
          break;
        case 8:
          spellRange = 94.5;
          damage = 32;
          break;
        case 9:
          spellRange = 47.5;
          damage = 64;
          break;
        case 10:
          spellRange = 23.75;
          damage = 128;
          break;
        case 11:
          spellRange = 12;
          damage = 256;
          break;
        case 12:
          spellRange = 6;
          damage = 512;
          break;
        case 13:
          spellRange = 3;
          damage = 1024;
          break;
        case 14:
          spellRange = 1.5;
          damage = 2048;
          break;
        case 15:
          spellRange = 0.75;
          damage = 4096;
          break;
        case 16:
          spellRange = 0.37;
          damage = 8192;
          break;
        default:
        console.log("Nuthin");
      }

      if(range <= spellRange) {
        this.sufferDamage(damage, attackDetails.attackingPlayer)
      } else {
        let broadcastDetails = {
          attackingPlayer: attackDetails.attackingPlayer,
          miss: true
        }
        this.socket.emit('broadcast', broadcastDetails);
      }
    }
  }

  sufferDamage(damage, attackingPlayer) {
    let currentHealth = this.state.health;
    let updatedHealth = currentHealth - damage;

    let fatality = false;
    if(updatedHealth < 1) {
      fatality = true;
      this.setState({
        health: updatedHealth,
        gameMessage: `You were obliterated with ${damage} damage by ${attackingPlayer}!`
      });
    } else {
      this.setState({
        health: updatedHealth,
        gameMessage: `You were zapped for ${damage} health by ${attackingPlayer}!`
      });
    }
    let broadcastDetails = {
      attackingPlayer: attackingPlayer,
      hitPlayer: this.state.player,
      damage: damage,
      fatality: fatality
    }
    this.socket.emit('broadcast', broadcastDetails);
  }


  receiveBroadcast(broadcastDetails) {
    if(broadcastDetails.hitPlayer !== this.state.player) {
      if(broadcastDetails.miss == true && broadcastDetails.attackingPlayer == this.state.player) {
        this.setState({attackMessage: `Your spell has no effect...`});
      } else if(broadcastDetails.fatality == true && broadcastDetails.attackingPlayer == this.state.player) {
        this.setState({attackMessage: `You killed ${broadcastDetails.hitPlayer}!`});
      } else if (broadcastDetails.fatality == true && broadcastDetails.attackingPlayer != this.state.player) {
        this.setState({gameMessage: `${broadcastDetails.attackingPlayer} killed ${broadcastDetails.hitPlayer}!`});
      } else if (broadcastDetails.attackingPlayer == this.state.player) {
        this.setState({attackMessage: `You hexed ${broadcastDetails.hitPlayer} for ${broadcastDetails.damage} damage!`});

      }
    }
  }
  submitScry(event) {
    event.preventDefault();

    var currentScryStatus = this.state.scry;
    if(!currentScryStatus) {
      this.setState({scry: true})

      let scryRequestDetails = {
        scryer: this.state.player
      }
      this.socket.emit('scryRequest', scryRequestDetails);
    } else {
      this.setState({scry: false})
    }
  }

  receiveScryRequest(scryRequestDetails) {
    if(scryRequestDetails.scryer !== this.state.player) {

      let scryTransmitDetails = {
        scryedPlayer: this.state.player,
        scryedLat: this.state.playerLat,
        scryedLng: this.state.playerLng
      }
      this.socket.emit('scryTransmit', scryTransmitDetails);
    }
  }

  receiveScryTransmit(scryTransmitDetails) {
    if(scryTransmitDetails.scryedPlayer !== this.state.player) {

      this.setState({
        scryedPlayer: scryTransmitDetails.scryedPlayer,
        scryedLat: scryTransmitDetails.scryedLat,
        scryedLng: scryTransmitDetails.scryedLng
      })
    }
  }


  //PLAYER SETUP FUNCTIONS

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

  placePlayer(obj, radius) {
    var streetView = new google.maps.StreetViewService();
    streetView.getPanorama({
      location: new google.maps.LatLng(obj.lat, obj.lng),
      radius: radius
    }, this.checkPanorama);
  }

  checkPanorama(data, status) {
    if(status == 'OK') {
      this.setState({
        playerLat: data.location.latLng.lat(),
        playerLng: data.location.latLng.lng()
      })
    }
  }

  //MAP UTILITY FUNCTIONS

  onMapChange(obj) {
    // console.log("Map center", obj.center);
    // console.log("Zoom", obj.zoom);
    // console.log("bounds", obj.bounds);
    // console.log("marginBounds", obj.marginBounds);

    this.setState({currentZoom: obj.zoom});
    this.setState({centerLat: obj.center.lat});
    this.setState({centerLng: obj.center.lng});
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




  render() {
    return(
      <div id="game-header">
        <h1>Wizard BATTLE</h1>
        <StatusLayer
          defaultCenter={this.state.defaultCenter}
          defaultZoom={this.state.defaultZoom}
          player={this.state.player}
          playerLat={this.state.playerLat}
          playerLng={this.state.playerLng}
          scryStatus={this.state.scry}
          currentZoom={this.state.currentZoom}
          centerLat={this.state.centerLat}
          centerLng={this.state.centerLng}
          scryedPlayer={this.state.scryedPlayer}
          scryedLat={this.state.scryedLat}
          scryedLng={this.state.scryedLng}
          health={this.state.health}
          gameMessage={this.state.gameMessage}
          attackMessage={this.state.attackMessage}
          chargeAnimation={this.state.chargeAnimation}

          onMapChange={this.onMapChange}
          onMapClick={this.onMapClick}
          submitPlayerName={this.submitPlayerName}
          getPlayerName={this.getPlayerName}
          submitOrb={this.submitOrb}
          submitScry={this.submitScry}
        />
      </div>
    )
  }
}




export default GameContainer;
