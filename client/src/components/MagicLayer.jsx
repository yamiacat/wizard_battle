import React from 'react';
import GoogleMapReact from 'google-map-react';
import {PlayerIcon} from './PlayerIcon.jsx';

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
      var playerIcon = null
    } else {
      var playerIcon = <PlayerIcon
        lat={this.props.playerLat}
        lng={this.props.playerLng}
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
        <h3>I am Magic Layer</h3>
      </div>
    )
  }
}

export default MagicLayer;
