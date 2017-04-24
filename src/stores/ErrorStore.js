import AppDispatcher from '../dispatcher/AppDispatcher';
import ErrorConstants from '../constants/ErrorConstants';
import { EventEmitter } from 'events';

const CHANGE_ERROR_EVENT = "changeError";

let _error = null;

function setError(error) {
  _error = error;
}

class ErrorStoreClass extends EventEmitter {

  emitErrorChange() {
    this.emit(CHANGE_ERROR_EVENT);
  }

  addErrorChangeListener(callback) {
    this.on(CHANGE_ERROR_EVENT, callback)
  }

  removeErrorChangeListener(callback) {
    this.removeListener(CHANGE_ERROR_EVENT, callback)
  }

  getError() {
    return _error;
  }

}

const ErrorStore = new ErrorStoreClass();

// Here we register a callback for the dispatcher
// and look for our various action types so we can
// respond appropriately
ErrorStore.dispatchToken = AppDispatcher.register(action => {

  switch(action.actionType) {
    case ErrorConstants.CLEAR_ERROR:
      setError(null);
      ErrorStore.emitErrorChange();
      break;

    case ErrorConstants.SHOW_ERROR:
      setError(action.error);
      ErrorStore.emitErrorChange();
      break;

    default:
  }

});

export default ErrorStore;