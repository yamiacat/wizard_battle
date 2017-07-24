import React from 'react';

export const OrbCast = (props) => {
  
  return(
    <div id="orb-cast">
      <form onSubmit={props.submitOrb}>
        <input type="submit" value="CAST SPELL"></input>
      </form>
    </div>
  )
}
