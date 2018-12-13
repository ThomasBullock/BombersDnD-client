const action = name => `myfootyteam18/player/${name}`;

export const SELECT_PLAYER = action('SELECT_PLAYER');

export const selectPlayer = id => ({ type: SELECT_PLAYER, id });

const initialState = 0;

const player = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_PLAYER:
      return action.id;
    default:
      return state;
  }
};

export default player;
