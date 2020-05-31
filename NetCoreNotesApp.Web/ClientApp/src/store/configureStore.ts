import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import * as Notes from "./Notes";
import * as NoteForm from "./NoteForm";

const configureStore = (history: any, initialState: any): any => {
  const reducers = {
    notes: Notes.reducer,
    noteForm: NoteForm.reducer,
  };

  const middleware: Array<any> = [thunk, routerMiddleware(history)];

  const rootReducer: any = combineReducers({
    ...reducers,
    routing: routerReducer,
  });

  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
};

export default configureStore;