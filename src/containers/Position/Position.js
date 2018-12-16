import React, { Component } from 'react';
import { bool, func, number, object, oneOfType, string } from 'prop-types';
import RemoveButton from '../../components/RemoveButton';
import { Paper } from 'material-ui';
// import Position from '../../components/Position';
import Player from '../../components/Player';
import NoPlayer from '../../components/common/NoPlayer';
import classNames from 'classnames';
import { addPlayer, removePlayer, resetSquad } from '../../modules/i_squad';
import { ItemTypes } from '../../constants/itemTypes';
import { DropTarget } from 'react-dnd';
import './Position.scss';

const posTarget = {
  drop(props, monitor) {
    return {
      id: props.id,
      position: props.position,
      playerId: props.playerId
    };
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
};

class Position extends Component {
  removeHandler(playerId, positionId) {
    console.log(playerId, positionId);
    return () => {
      this.props.changePlayerSelectionStatus(playerId);
      this.props.removePlayer(positionId);
    };
  }

  renderOverlay(color) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 1,
          backgroundColor: color
        }}
      />
    );
  }
  render() {
    const {
      classes,
      playerId,
      position,
      id,
      selectPosition,
      selectHandler,
      selected,
      addPlayer,
      removePlayer,
      changePlayerSelectionStatus,
      resetPlayersSelection,
      players,
      connectDropTarget,
      isOver
    } = this.props;
    // console.log(playerId, selected);
    const positionClasses = classNames({
      'position' : true,
      'position--selected' : selected,
      [`${classes}`] : classes,
      'position-over' : isOver
    })
    // console.log(isOver)
    return connectDropTarget(
      <div className={positionClasses}>
        <Paper         
          onClick={() => selectPosition(id)}
          style={{
            position: 'relative',
            // height: '100px',
            background: 'transparent'
          }}
           >
        {playerId !== null && (
          <RemoveButton
            removePlayer={this.removeHandler(playerId, id)}
            positionId={id}
          />
        )}
        {(playerId !== null) ? (
          <Player
            id={playerId}
            player={players.get(playerId)}
            inSquad={players.getIn([playerId, 'inSquad'])} //[playerId].inSquad}
            selectHandler={selectHandler}
            addPlayer={addPlayer}
            changePlayerSelectionStatus={changePlayerSelectionStatus}
            resetPlayersSelection={resetPlayersSelection}
            selected={selected}
          />)
          :(
            <NoPlayer />
          )
        }
        {/* {selected && this.renderOverlay('#333')} */}
        {isOver && this.renderOverlay('#EEEEEE')}
        </Paper>
      </div>
    );
  }
}

Position.defaultProps = {};

Position.propTypes = {
  playerId : oneOfType([
    number,
    () => {
      return null;
    }
  ]), // cannot is require because propTYpes wont accept null!!
  position : string.isRequired,
  connectDropTarget: func.isRequired,
  isOver: bool.isRequired,
  selectPosition: func.isRequired,
  selectHandler: func.isRequired,
  addPlayer: func.isRequired,
  removePlayer: func.isRequired,
  resetPlayersSelection: func.isRequired
};

export default DropTarget(ItemTypes.PLAYER, posTarget, collect)(
  Position
);
