// import { combineReducers } from 'redux';
import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux';
import auth from './auth';
// import players from './players';
import players from './i_players';
import player from './player';
import squad from './i_squad';

export default combineReducers({
  // router: routerReducer,
  // auth,
  // players,
  players,
  player,
  squad
});
