import React from 'react';

export const ScryCast = (props) => {

  return(
    <div id="scry-cast">
      <form onSubmit={props.submitScry}>
        <input type="submit" value="SCRY"></input>
      </form>
    </div>
  )
}