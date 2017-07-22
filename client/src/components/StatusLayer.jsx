import React from 'react';
import MagicLayer from './MagicLayer.jsx'

class StatusLayer extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <h2>I am Status Layer</h2>
        <MagicLayer
          defaultCenter={this.props.defaultCenter}
          defaultZoom={this.props.defaultZoom}>
          ></MagicLayer>
      </div>
    )
  }
}


export default StatusLayer;
