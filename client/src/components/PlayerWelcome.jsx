import React from 'react';

class PlayerWelcome extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    if(!this.props.player) {
      var playerChoice =
      <form id="player-form" onClick={this.props.submitPlayerName}>
        <input  className="player-input"
          id={this.props.player}
          type="text"
          onKeyUp={this.props.getPlayerName}
          placeholder="Choose your wizarding name!"
          autoFocus>
        </input>
        <input type="submit" value="Submit"></input>
      </form>
    } else {
      playerChoice = <h4 className="player-input">Click on (almost) any bit of land, anywhere in the world, to choose your start position!</h4>
    }


    return(
      <div id="player-welcome">
        Welcome {this.props.player}!
        {playerChoice}

      </div>
    )
  }
}

export default PlayerWelcome;
