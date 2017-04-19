import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';
import GamesAPI from './GamesAPI';

export default {

  newGame: () => {
    GamesAPI
      .newGame()
      .then(response => {
        AppDispatcher.dispatch({
          actionType: GameConstants.RECEIVE_GAME,
          game: response
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: GameConstants.RECEIVE_GAME_ERROR,
          message: message
        });
      });
  },

  loadGame: () => {
    GamesAPI
      .loadGame()
      .then(response => {
        AppDispatcher.dispatch({
          actionType: GameConstants.RECEIVE_GAME,
          game: response
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: GameConstants.RECEIVE_GAME_ERROR,
          message: message
        });
      });
  },

  saveGame: () => {
    GamesAPI
      .saveGame()
      .then(response => {
        AppDispatcher.dispatch({
          actionType: GameConstants.RECEIVE_GAME,
          game: response
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: GameConstants.SAVE_GAME_ERROR,
          message: message
        });
      });
  },

  changeGame: (game) => {
    AppDispatcher.dispatch({
      actionType: GameConstants.CHANGE_GAME,
      game: game
    });
  },

  changeProsperity: (amount) => {
    AppDispatcher.dispatch({
      actionType: GameConstants.CHANGE_PROSPERITY,
      amount: amount
    });
  }

}