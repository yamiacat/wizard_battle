import React from 'react';
import GoogleMapReact from 'google-map-react';
import {PlayerIcon} from './PlayerIcon.jsx';
import {OrbCast} from './OrbCast.jsx';
import {ScryCast} from './ScryCast.jsx';
import  apiKey from '../apiKey.js'
import {ScryPanorama} from './ScryPanorama.jsx'

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
      var spellButton = null;
      var center = this.props.defaultCenter;
      var zoom = this.props.defaultZoom;
    } else {
      var center = {lat: this.props.centerLat, lng: this.props.centerLng};
      var zoom = this.props.currentZoom;
      var playerIcon = <PlayerIcon
        lat={this.props.playerLat}
        lng={this.props.playerLng}
      />
      var spellButton = <div id="spell-buttons">
      <OrbCast
        submitOrb={this.props.submitOrb}
      />
      <ScryCast
        submitScry={this.props.submitScry}
      />
      </div>
    }

    console.log("Magic Layer here, scryStatus:", this.props.scryStatus)

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
      <div id="magic-layer">
            {mainPanel}
        <h3>I am Magic Layer</h3>
      </div>
      {spellButton}
      </div>
    )
  }
}

export default MagicLayer;
