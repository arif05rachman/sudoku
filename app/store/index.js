import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger"
import { boardReducers, playerReducers } from "./reducers";

const reducers = combineReducers({
  boardReducers,
  playerReducers,
});

const store = createStore(reducers, applyMiddleware(thunk, logger));

export default store