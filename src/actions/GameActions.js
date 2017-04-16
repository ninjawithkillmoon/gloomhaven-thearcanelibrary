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
          game: response.game
        });
      })
      .catch(message => {
        AppDispatcher.dispatch({
          actionType: GameConstants.RECEIVE_GAME_ERROR,
          message: message
        });
      });
  },

  changeSpace: (space) => {
    AppDispatcher.dispatch({
      actionType: GameConstants.CHANGE_SPACE,
      space: space
    });
  }

}