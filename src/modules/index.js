import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import players from './players';
import player from './player';
import squad from './squad';

export default combineReducers({
  router: routerReducer,
  auth,
  players,
  player,
  squad
});
