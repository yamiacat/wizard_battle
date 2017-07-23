import React from 'react';
import GoogleMapReact from 'google-map-react';
import {PlayerIcon} from './PlayerIcon.jsx';
import OrbCast from './OrbCast.jsx';

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
      var spellButton = <OrbCast 
      submitOrb={this.props.submitOrb}
      />
    }

    return(
      <div id="magic-layer">
        <GoogleMapReact
          defaultCenter={this.props.defaultCenter}
          defaultZoom={this.props.defaultZoom}
          onChange={this.props.onMapChange}
          options={this.createMapOptions}
          onClick={this.props.onMapClick}
          playerLat={this.props.playerLat}
          >
            {playerIcon}
          </GoogleMapReact>
            {spellButton}
        <h3>I am Magic Layer</h3>
      </div>
    )
  }
}

export default MagicLayer;
