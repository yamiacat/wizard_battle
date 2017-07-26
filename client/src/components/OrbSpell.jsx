import React from 'react';

export const OrbSpell = (props) => {

  return(
      <div id="orb-spell">
      <div id="charging-circle" style={props.chargeAnimation}></div>
      <div id="hit-circle" style={props.hitAnimation}></div>
      </div>
  )
}
