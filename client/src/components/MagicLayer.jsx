import React from 'react';
import GoogleMapReact from 'google-map-react';

class MagicLayer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div id="magic-layer">
        <GoogleMapReact
          defaultCenter={this.props.defaultCenter}
          defaultZoom={this.props.defaultZoom}
          >
          </GoogleMapReact>
        <h3>I am Magic Layer</h3>
      </div>
    )
  }
}

export default MagicLayer;