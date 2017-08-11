import React from 'react';

export const OtherPlayers = (props) => {

  let otherPlayers = props.otherPlayers;
  let renderPlayers = [];

    for (const key of Object.keys(otherPlayers)) {

      let healthPercentage = (otherPlayers[key]/10)+"%";
      let healthLevel

      if(otherPlayers[key] > 666) {
        healthLevel = {backgroundColor: 'limegreen',
          width: healthPercentage,
          height: '10px'}
      } else if(otherPlayers[key] < 333) {
        healthLevel = {backgroundColor: 'red',
          width: healthPercentage,
          height: '10px'}
      } else {
        healthLevel = {backgroundColor: 'darkorange',
          width: healthPercentage,
          height: '10px'}
      }


        renderPlayers.push(
          <div>
            <p className="other-player-info">{key} - {otherPlayers[key]}</p>
            <div className="other-player-bar" style={healthLevel}></div>
          </div>
        )
      }


  return(
    <div id="other-players">

        {renderPlayers}

    </div>

  )
}
