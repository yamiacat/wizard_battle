import React from 'react';

class OrbCast extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {


    return(
      <div id="orb-cast">
        <form onSubmit={this.props.submitOrb}>
          <input type="submit" value="CAST SPELL"></input>
        </form>
      </div>
    )
  }
}

export default OrbCast;
