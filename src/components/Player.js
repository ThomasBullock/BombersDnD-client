import React, { Component } from 'react';
import { bool, func, number, object, string } from 'prop-types';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../constants/itemTypes';
import { addPlayer, removePlayer } from '../modules/squad';
import './Player.scss';

const playerSource = {
  beginDrag(props) {
    console.log(props);
    return {
      id: props.id,
      changePlayerSelectionStatus: props.changePlayerSelectionStatus
    };
  },
  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      // console.log(props);
      const dropResult = monitor.getDropResult();
      if (!props.inSquad) {
        console.log('cahenge status');
        props.changePlayerSelectionStatus(props.id);
        // props.removePlayer()
      }

      console.log(dropResult);
      // if a player is already in this position it will be replaced so we update is selection status
      if(dropResult.playerId === props.id) {
        console.log('same player exit!')
        return;
      }
      if(dropResult.playerId !== null) { 
        props.changePlayerSelectionStatus(dropResult.playerId);
      }
      props.addPlayer(props.id, dropResult.id);
      props.selectHandler(props.id);
    }
  }
};

const collect = (connect, monitor) => {
  // console.log(monitor.didDrop())
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

class Player extends Component {
  render() {
    const {
      id,
      player,
      selectHandler,
      addPlayer,
      connectDragSource,
      changePlayerSelectionStatus,
      isDragging,
      inSquad
    } = this.props;
    return connectDragSource(
      <div
        className="player"
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          background: inSquad ? '#444' : 'black',
        }}
        onClick={() => selectHandler(id)}>
        <span className="player__number">{player.number}</span>
        {/* <span className="player__name">{player.name}</span>
        <span className="player__surname">{player.surname}</span> */}
        <div className="player__img-wrapper">
          <img className="player__img" src={player.imageUrl} alt={`${player.name} ${player.surname}`} />
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  addPlayer: func.isRequired,
  changePlayerSelectionStatus: func.isRequired,
  connectDragSource: func.isRequired,
  isDragging: bool.isRequired,
  id: string.isRequired,
  inSquad: bool.isRequired,
  player: object.isRequired,
  selectHandler: func.isRequired,
}

export default DragSource(ItemTypes.PLAYER, playerSource, collect)(Player);
