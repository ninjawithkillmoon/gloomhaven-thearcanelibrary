import AppDispatcher from '../dispatcher/AppDispatcher';
import ErrorConstants from '../constants/ErrorConstants';

export default {

  clearError: () => {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERROR,
    });
  },

  showError: (originalError, message) => {
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SHOW_ERROR,
      error: {
        originalError: originalError,
        message: message
      }
    });
  }

}