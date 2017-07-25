import React from 'react';
import ReactStreetview from 'react-streetview';
import apiKey from '../apiKey.js';

export const ScryPanorama = (props) => {
if(!props.scryedLat) return null;
  const streetViewPanoramaOptions = {
    position: {lat: props.scryedLat, lng: props.scryedLng},
    linksControl: false,
    disableDefaultUI: true
  }

  return(
    <div id="scry-panorama">
      <ReactStreetview
        apiKey={apiKey}
        streetViewPanoramaOptions={streetViewPanoramaOptions}
      />
      <div id="clue-mask"></div>
    </div>
  )
}
