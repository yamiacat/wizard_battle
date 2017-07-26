import React from 'react';

export const OrbCast = (props) => {

  return(
    <div id="orb-cast">
      <form onSubmit={props.submitOrb}>
        <button type="submit" value="submit">CAST SPELL</button>
      </form>
    </div>
  )
}
