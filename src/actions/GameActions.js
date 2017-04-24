import AppDispatcher from '../dispatcher/AppDispatcher';
import GameConstants from '../constants/GameConstants';
import GameStore from '../stores/GameStore';
import FileSaver from 'file-saver';
import moment from "moment";

export default {

  loadGame: (game) => {
    AppDispatcher.dispatch({
      actionType: GameConstants.RECEIVE_GAME,
      game: game
    });
  },

  saveGame: () => {
    // generates a JSON representation of the game and saves it in a file for the user to save on disk

    let data = JSON.stringify(GameStore.getGame(), null, 2); // pretty prints, but line endings don't seem to be 
    data = data.replace(/[\n\r]/g, '\r\n'); // ensure Windows line endings, in case anyone is actually stupid enough to open the generated file in Notepad

    let filename = "gloomhaven_save_" + moment().format("YYYYMMDD_HHmm");

    let blob = new Blob([data], {type: "text/plain;charset=utf-8"});
    FileSaver.saveAs(blob, filename);
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