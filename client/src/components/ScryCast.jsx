import React from 'react';

export const ScryCast = (props) => {

  return(
    <div id="scry-cast">
      <form onSubmit={props.submitScry}>
        <button type="submit" value="submit">See through someone's EYES</button>
      </form>
    </div>
  )
}
