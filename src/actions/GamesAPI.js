import fetch from 'node-fetch';
import GameStore from '../stores/GameStore';

const GAME_ID = "58fc3ad5779dd11ea8bde78d";

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
    // don't allow saving unless a name has abeen specified
    if (!GameStore.getGame().name) {
      return;
    }

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