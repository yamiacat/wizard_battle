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
    } else {
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



    if(!this.props.scryStatus) {
      var mainPanel =
      <GoogleMapReact
        bootstrapURLKeys={{
          key: apiKey
        }}
        defaultCenter={this.props.defaultCenter}
        defaultZoom={this.props.defaultZoom}
        onChange={this.props.onMapChange}
        options={this.createMapOptions}
        onClick={this.props.onMapClick}
        playerLat={this.props.playerLat}
        >
          {playerIcon}
        </GoogleMapReact>
    } else {
      var mainPanel = <ScryPanorama
        playerLat={this.props.playerLat}
        playerLng={this.props.playerLng}
      />



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
