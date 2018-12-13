import axios from 'axios';
import moment from 'moment';
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

const initialState = [
  {
    id: null,
    name: null,
    imageUrl: null,
    games: null,
    dob: null
  }
];

const player = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_PLAYER_LIST:
      // console.log(action.players)
      // 	console.log(state)
      return action.players.map(obj => {
        obj.inSquad = false;
        obj.imageUrl = imgUrlGenerator(obj);
        return obj;
      });
    case RESET_PLAYERS_SELECTION:
      return Object.assign(
        [...state],
        state.map((item, i) => {
          return {
            id: item.id,
            name: item.name,
            imageUrl: imgUrlGenerator(item),
            games: item.games,
            dob: item.dob,
            height: item.height,
            status: item.status,
            surname: item.surname,
            primary: item.primary,
            secondary: item.secondary,
            inSquad: false
          };
        })
      );
    case CHANGE_PLAYER_SELECTION_STATUS:
      const updatedPlayer = state.filter((player, i) => {
        return player.id === action.playerId;
      })[0];
      console.log(updatedPlayer.inSquad);
      updatedPlayer.inSquad = !updatedPlayer.inSquad;
      console.log(updatedPlayer);
      let updatedState = state.map(player => {
        if (player.id === updatedPlayer.id) {
          return updatedPlayer;
        } else {
          return player;
        }
      });
      console.log(updatedState);
      return Object.assign(updatedState);

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
    console.log(player.dob);
    player.dob = new Date(player.dob).toISOString().substring(0, 10);
    console.log(player.dob);
    const body = JSON.stringify(player);
    console.log(body);

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
