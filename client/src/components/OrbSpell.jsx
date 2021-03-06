import React from 'react';

export const OrbSpell = (props) => {

  let hitShape

  if(props.hitSomething == true) {
    let damageStyle = {
      borderWidth: props.damageCaused,
      top: (60 + props.damageCaused)*-1
      };
    hitShape = <div className="hit-shape" id="hit-triangle">
      <div id="hit-bar" className="hit-shape" style={damageStyle}></div>
    </div>
  }

  return(
    <div id="spell-wrapper">
      <div id="orb-wrapper">
        <div id="orb-spell">
        <div id="charging-circle"
          style={props.chargeAnimation}>
          </div>
        </div>
      </div>
      <div id="hit-wrapper">
        {hitShape}
      </div>
    </div>
  )
}
