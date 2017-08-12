import React from 'react';
import GoogleMapReact from 'google-map-react';
import {PlayerIcon} from './PlayerIcon.jsx';
import  apiKey from '../apiKey.js'
import ScryPanorama from './ScryPanorama.jsx'

class MagicLayer extends React.Component {

  constructor(props) {
    super(props);
  }


  createMapOptions(maps) {
    var mapOptions = {
      scaleControl: true,
      scrollwheel:  false,
      clickableIcons: false,
      maxZoom: 16,
    }
    return mapOptions
  }


  render() {


    if(!this.props.playerLat) {
      var playerIcon = null;
      var center = this.props.defaultCenter;
      var zoom = this.props.defaultZoom;
    } else if (this.props.health > 0) {
      var center = {lat: this.props.centerLat, lng: this.props.centerLng};
      var zoom = this.props.currentZoom;
      var playerIcon = <PlayerIcon
        lat={this.props.playerLat}
        lng={this.props.playerLng}
      />
    } else {
      var playerIcon = null;
    }


    if(!this.props.scryStatus) {
      var mainPanel =
      <GoogleMapReact
        bootstrapURLKeys={{
          key: apiKey
        }}
        defaultCenter={center}
        defaultZoom={zoom}
        onChange={this.props.onMapChange}
        options={this.createMapOptions}
        onClick={this.props.onMapClick}
        playerLat={this.props.playerLat}
        >
          {playerIcon}
        </GoogleMapReact>
    } else {
      var mainPanel = <ScryPanorama
        scryedLat={this.props.scryedLat}
        scryedLng={this.props.scryedLng}
      ></ScryPanorama>
    }

    return(
      <div id="magic-layer-wrapper">
      <div id="magic-layer" onKeyUp={this.props.keyListen}>
            {mainPanel}
      </div>
      </div>
    )
  }
}

export default MagicLayer;
