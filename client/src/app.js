import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from './containers/GameContainer.jsx';

window.addEventListener('load', function () {
  ReactDOM.render(
    <GameContainer></GameContainer>,
    document.getElementById('app')
  );
});
