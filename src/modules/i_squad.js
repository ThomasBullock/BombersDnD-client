import Immutable from 'immutable';

const action = name => `myfootyteam18/squad/${name}`;

export const SELECT_POSITION = action('SELECT_POSITION');
export const ADD_PLAYER = action('ADD_PLAYER');
export const REMOVE_PLAYER = action('REMOVE_PLAYER');
export const RESET_SQUAD = action('RESET_SQUAD');
export const selectPosition = (positionId) => ({ type: SELECT_POSITION, positionId });
export const addPlayer = (playerId, positionId) => ({
  type: ADD_PLAYER,
  playerId,
  positionId
});
export const removePlayer = positionId => ({ type: REMOVE_PLAYER, positionId });
export const resetSquad = () => ({ type: RESET_SQUAD });

const initialState = Immutable.fromJS([
  { id: 0, position: 'LeftBackPocket', playerId: null, selected: true },
  { id: 1, position: 'FullBack', playerId: null, selected: false },
  { id: 2, position: 'RightBackPocket', playerId: null, selected: false },
  { id: 3, position: 'LeftHalfBack', playerId: null, selected: false },
  { id: 4, position: 'CentreHalfBack', playerId: null, selected: false },
  { id: 5, position: 'RightHalfBack', playerId: null, selected: false },
  { id: 6, position: 'LeftWing', playerId: null, selected: false },
  { id: 7, position: 'Centre', playerId: null, selected: false },
  { id: 8, position: 'RightWing', playerId: null, selected: false },
  { id: 9, position: 'Ruck', playerId: null, selected: false },
  { id: 10, position: 'Ruck-Rover', playerId: null, selected: false },
  { id: 11, position: 'Rover', playerId: null, selected: false },
  { id: 12, position: 'LeftHalfForward', playerId: null, selected: false },
  { id: 13, position: 'CentreHalfForward', playerId: null, selected: false },
  { id: 14, position: 'RightHalfForward', playerId: null, selected: false },
  { id: 15, position: 'LeftForwardPocket', playerId: null, selected: false },
  { id: 16, position: 'FullForward', playerId: null, selected: false },
  { id: 17, position: 'RightForwardPocket', playerId: null, selected: false },
  { id: 18, position: 'Interchange1', playerId: null, selected: false },
  { id: 19, position: 'Interchange2', playerId: null, selected: false },
  { id: 20, position: 'Interchange3', playerId: null, selected: false },
  { id: 21, position: 'Interchange4', playerId: null, selected: false }
]);

const squad = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SELECT_POSITION: // refactor!
      return state.update((positions) => {
        console.log(positions);
        return positions.map(position => {
          if(position.get('id') == action.positionId) {
            console.log('set true');
            return position.set('selected', true)
          } else {
            console.log('set false');
            return position.set('selected', false)
          }
        })
      })
      // return Object.assign(
      //   [...state],
      //   state.map(item => {
      //     return {
      //       id: item.id,
      //       position: item.position,
      //       playerId: item.playerId,
      //       selected: item.id === action.positionId ? true : false
      //     };
      //   }),
      //   {}
      // );
    case ADD_PLAYER:
      console.log(action);
      console.log(state.toJS())
      // return Object.assign(
      //   [...state],
        // state.map(position => {
        //   if (position.id === action.positionId) {
            return state.update(positions => {
              return positions.map(position => {
                if (position.get('id') == action.positionId) {
                  console.log('pos = action.posId');
                  return position.set('playerId', action.playerId).set('selected', true)
                } else if (position.get('playerId') == action.playerId) {
                  console.log('else if');
                  return position.set('playerId', null).set('selected', false)
                } else {
                  console.log('else');
                  
                  return position.set('selected', false)
                }

              })
            })
          //   return {
          //     id: action.positionId,
          //     position: state[action.positionId].position,
          //     playerId: action.playerId, // can we get this from state??
          //     selected: true
          //   };
          // } else if (position.playerId === action.playerId) {
          //   return {
          //     id: position.id,
          //     position: position.position,
          //     playerId: null, // can we get this from state??
          //     selected: false
          //   };
          // } else {
          //   return { // this is to clear away any other 'selected' positions
          //     id: position.id,
          //     position: position.position,
          //     playerId: position.playerId, // can we get this from state??
          //     selected: false
          //   };
          // }
        // })
      // );
    case REMOVE_PLAYER:
      console.log(action);
      return Object.assign([
        ...state.slice(0, action.positionId),
        {
          id: action.positionId,
          position: state[action.positionId].position,
          playerId: null,
          selected: true
        },
        ...state.slice(action.positionId + 1)
      ]);
    case RESET_SQUAD:
      return state.update(positions => {
        return positions.map((position, i) => {
          if (i === 0) {
            return position.set('playerId', null).set('selected', true)
          } else {
            return position.set('playerId', null).set('selected', false)
          }
        })
      })
    default:
      return state;
  }
};

export default squad;
