import React from 'react';

export const PlayerWelcome = (props) => (


  <div id="player-welcome">
    Welcome {props.player}!
    <form id="player-form" onClick={props.submitPlayerName}>
      <input className="player-input" id={props.player} key={props.player} type="text" onKeyUp={props.getPlayerName} placeholder="Choose your wizarding name!"></input>
      <input type="submit" value="Submit"></input>
    </form>


  </div>
)
