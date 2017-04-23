import fetch from 'node-fetch';
import GameStore from '../stores/GameStore';

const GAME_ID = "58fc24cc779dd11ea8bde78c";

export default {

  loadGame: () => {
    return fetch("http://10.1.1.83:3001/api/games/" + GAME_ID, {
      method: "GET",
      compress: false
    })
    .then(function(response) {
      return response.json();
    });
  },

  saveGame: () => {
    return fetch("http://10.1.1.83:3001/api/games/" + GAME_ID, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      compress: false,
      body: JSON.stringify(GameStore.getGame())
    })
    .then(function(response) {
      return response.json();
    });
  },  
}