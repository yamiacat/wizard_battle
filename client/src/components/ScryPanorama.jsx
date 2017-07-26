import React from 'react';
import ReactStreetview from 'react-streetview';
import apiKey from '../apiKey.js';

class ScryPanorama extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(!this.props.scryedLat) return null;

    const streetViewPanoramaOptions = {
      position: {lat: this.props.scryedLat, lng: this.props.scryedLng},
      linksControl: false,
      disableDefaultUI: true
    }

    return(
      <div id="scry-panorama" >
        <ReactStreetview
          apiKey={apiKey}
          streetViewPanoramaOptions={streetViewPanoramaOptions}
        />
        <div id="clue-mask"></div>
      </div>
    )
  }

}
export default ScryPanorama;
