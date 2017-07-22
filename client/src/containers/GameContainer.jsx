import React from 'react';
import StatusLayer from '../components/StatusLayer.jsx';

class GameContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      defaultCenter: {lat: 59.95, lng: 30.33},
      defaultZoom: 1
    }
  }

  render() {
    return(
      <div>
        <h1>Wizard BATTLE</h1>
        <StatusLayer
          defaultCenter={this.state.defaultCenter}
          defaultZoom={this.state.defaultZoom}>
          </StatusLayer>
      </div>
    )
  }
}




export default GameContainer;
