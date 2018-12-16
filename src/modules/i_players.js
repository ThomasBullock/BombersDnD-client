import axios from 'axios';
import Immutable from 'immutable';
import moment from 'moment';
import { createSelector } from 'reselect'
import _ from 'lodash';
import { imgUrlGenerator } from './helpers';
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://localhost:8000/api'
    : 'https://59b0e017ffff010011b4ef5c.mockapi.io/api';

const action = name => `myfootyteam18/player/${name}`;

export const REQUEST_PLAYER_LIST = action('REQUEST_PLAYER_LIST');
export const RECEIVE_PLAYER_LIST = action('RECEIVE_PLAYER_LIST');
export const ADD_NEW_PLAYER_TO_LIST = action('ADD_NEW_PLAYER_TO_LIST');
export const UPDATE_PLAYER_ON_LIST = action('UPDATE_PLAYER_ON_LIST');
export const DELETE_PLAYER_FROM_LIST = action('DELETE_PLAYER_FROM_LIST');
export const CHANGE_PLAYER_SELECTION_STATUS = action(
  'CHANGE_PLAYER_SELECTION_STATUS'
);
export const RESET_PLAYERS_SELECTION = action('RESET_PLAYERS_SELECTION');

export const requestPlayerList = () => ({ type: REQUEST_PLAYER_LIST });
export const receivePlayerList = players => ({
  type: RECEIVE_PLAYER_LIST,
  players
});
export const addNewPlayerToList = player => ({
  type: ADD_NEW_PLAYER_TO_LIST,
  player
});
export const updatePlayerOnList = player => ({
  type: UPDATE_PLAYER_ON_LIST,
  player
});
export const deletePlayerFromList = player => ({
  type: DELETE_PLAYER_FROM_LIST,
  player
});

export const changePlayerSelectionStatus = playerId => ({
  type: CHANGE_PLAYER_SELECTION_STATUS,
  playerId
});
export const resetPlayersSelection = () => ({ type: RESET_PLAYERS_SELECTION });

// Selectors 

// create select functions to pick of pieces of state we need
const playersSelector = state => state.players
const selectedPlayerId = state => state.player

const getPlayer = (players, selectedPlayerId) => {
  console.log(players, selectedPlayerId);
  const selectedPlayer = _.filter(
    players,
    player => _.contains(selectedPlayerId, player.id)
  );

  return selectedPlayer
}

export const playerSelector = createSelector(
  playersSelector, // pick off a piece of state
  selectedPlayerId, // pick off a piece of state
  getPlayer // last arg is the func that has our select logic
)


const initialState = Immutable.fromJS([
  {
    id: null,
    name: null,
    imageUrl: null,
    games: null,
    dob: null
  }
]);

const player = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case RECEIVE_PLAYER_LIST:
      // console.log(action.players)
      // 	console.log(state)
      return Immutable.fromJS(action.players.map(obj => {
        obj.inSquad = false;
        obj.imageUrl = imgUrlGenerator(obj);
        return obj;
      }));
    case RESET_PLAYERS_SELECTION:
      return state.update(players => {
        return players.map(player => {
          return player.set('inSquad', false)
        })
      })
    case CHANGE_PLAYER_SELECTION_STATUS:
        return state.update(action.playerId, (player) => {
          console.log(player)
          return player.set('inSquad', !player.get('inSquad'))
        })

        // console.log(state.toJS())
        // // state.update()
        // return state.update(action.playerId, (player) => {
        //   return player.inSquad = !player.inSquad
        // })

      // const updatedPlayer = state.filter((player, i) => {
      //   return player.get('id') === action.playerId;
      // }).get(0);
      // // console.log(updatedPlayer.get('inSquad'));
      // updatedPlayer.set('inSquad', !updatedPlayer.get('inSquad'));
      // console.log(updatedPlayer);
      // let updatedState = state.map(player => {
      //   if (player.id === updatedPlayer.id) {
      //     return updatedPlayer;
      //   } else {
      //     return player;
      //   }
      // });
      // console.log(updatedState);
      // return Immutable.fromJS(Object.assign(updatedState));

    case DELETE_PLAYER_FROM_LIST:
      return Object.assign(
        state.filter(player => player.id !== action.player.id)
      );

    case UPDATE_PLAYER_ON_LIST:
      console.log('in update player reducer');
      return Object.assign(
        state.map(player => {
          if (player.id === action.player.id) {
            console.log(player);
            return action.player;
          } else {
            return player;
          }
        })
      );
    default:
      return state;
  }
};

export default player;

export const fetchPlayers = () => {
  return dispatch => {
    dispatch(requestPlayerList()); // delete

    return axios.get(`${baseUrl}/players`).then(response => {
      dispatch(receivePlayerList(response.data));
    });
  };
};

export const addPlayerToDatabase = player => {
  // need to add to reducer
  return dispatch => {
    player.dob = new Date(player.dob).toISOString().substring(0, 10);

    const body = JSON.stringify(player);


    return axios({
      method: 'post',
      url: `${baseUrl}/players`,
      data: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        dispatch(addNewPlayerToList(player));
      })
      .catch(error => {
        console.log(error.response);
      });
  };
};

export const deletePlayerFromDatabase = player => {
  return dispatch => {
    console.log(player);
    const body = JSON.stringify(player);

    return axios({
      method: 'delete',
      url: `${baseUrl}/players/${player.id}`,
      data: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        dispatch(deletePlayerFromList(player));
      })
      .catch(error => {
        console.log(error.response);
      });
  };
};

export const updatePlayerInDatabase = player => {
  return dispatch => {
    console.log(player);
    player.dob = new Date(player.dob).toISOString().substring(0, 10);
    const body = JSON.stringify(player);
    dispatch(updatePlayerOnList(player));

    return axios({
      method: 'put',
      url: `${baseUrl}/players/${player.id}`,
      data: body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        console.log(response.data);
        dispatch(updatePlayerOnList(player));
      })
      .catch(error => {
        console.log(error.response);
      });
  };
};
