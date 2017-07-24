import React from 'react';
import ReactStreetview from 'react-streetview';
import apiKey from '../apiKey.js';

export const ScryPanorama = (props) => {

  const streetViewPanoramaOptions = {
    position: {lat: props.playerLat, lng: props.playerLng},
    linksControl: false,
    disableDefaultUI: true
  }


return(
  <div id="scry-panorama">
    <ReactStreetview
      apiKey={apiKey}
      streetViewPanoramaOptions={streetViewPanoramaOptions}
    />
  </div>
)

}
