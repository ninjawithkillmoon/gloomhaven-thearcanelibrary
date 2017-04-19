import fetch from 'node-fetch';
import GameStore from '../stores/GameStore';

const GAME_ID = "58f746a3c30b4325c0a23882";

export default {

  loadGame: () => {
    return fetch("http://localhost:3001/api/games/" + GAME_ID, {
      method: "GET",
      compress: false
    })
    .then(function(response) {
      return response.json();
    });
  },

  saveGame: () => {
    console.log(GameStore.getGame());

    return fetch("http://localhost:3001/api/games/" + GAME_ID, {
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