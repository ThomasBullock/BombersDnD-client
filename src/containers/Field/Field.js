import React, { Component, Fragment } from 'react';
import { array, func, object } from 'prop-types';
import { connect } from 'react-redux';

import { addPlayer, removePlayer, selectPosition } from '../../modules/squad';
import './Field.scss';

import Statistics from '../Statistics/Statistics';
import Player from '../../components/Player';
import { selectPlayer } from '../../modules/player';
import { changePlayerSelectionStatus, resetPlayersSelection } from '../../modules/players';
import Position from '../Position/Position';

class Field extends Component {
  selectedPlayerArray() {
    const selectedPlayerArray = [];
    // console.log(this.props.players)
    this.props.squad.forEach( (position) => {
      if(position.playerId !== null) {
        selectedPlayerArray.push(this.props.players[position.playerId])
      }
    })
    return selectedPlayerArray;
  }

  renderPositions() {
    return this.props.squad.map((pos, i) => {
      let positionClass;
      switch (true) {
        case i === 0 || i === 15:
          positionClass = 'position--left-pocket';
          break;
        case i === 2 || i === 17:
          positionClass = 'position--right-pocket';
          break;
        case i === 3 || i === 12:
          positionClass = 'position--left-flank';
          break;
        case i === 5 || i === 14:
          positionClass = 'position--right-flank';
          break;
        case i > 17:
          positionClass = 'position--bench';
          break;
        default:
          positionClass = 'position';
          break;
      }
      // console.log(pos)
      return (
        <Position
          classes={positionClass}
          key={pos.position}
          id={pos.id}
          position={pos.position}
          selected={pos.selected}
          playerId={pos.playerId}
          selectPosition={this.props.selectPosition}
          selectHandler={this.props.selectPlayer}
          addPlayer={this.props.addPlayer}
          removePlayer={this.props.removePlayer}
          changePlayerSelectionStatus={this.props.changePlayerSelectionStatus}
          resetPlayersSelection={this.props.resetPlayersSelection}
          players={this.props.players}>
          {/* {pos.playerId && <Player id={pos.playerId} player={players[pos.playerId]} selectHandler={selectPlayer} />} */}
        </Position>
      );
    });
  }

  render() {
    // console.log(this.selectedPlayerArray());
    return (
      <Fragment>
        <Statistics selectedPlayers={this.selectedPlayerArray()}/>
        <div className="col-lg-7">
          <div className="field">
            {/* <div className="field__wrapper">{this.renderPositions()}</div> */}
            {this.renderPositions()}
          </div>
        </div>
      </Fragment>  
    );
  }
}

Field.propTypes = {
  addPlayer: func.isRequired,
  removePlayer: func.isRequired,
  resetPlayersSelection: func.isRequired,
  changePlayerSelectionStatus: func.isRequired,  
  selectPosition: func.isRequired,
  squad: array.isRequired,
  players: array.isRequired
};

const mapStateToProps = state => {
  return {
    squad: state.squad,
    players: state.players
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectPlayer: (id) => dispatch(selectPlayer(id)),
    selectPosition: position => dispatch(selectPosition(position)),
    addPlayer: (player, positionId) => dispatch(addPlayer(player, positionId)),
    removePlayer: position => dispatch(removePlayer(position)),
    changePlayerSelectionStatus: (playerId) => dispatch(changePlayerSelectionStatus(playerId)),
    resetPlayersSelection: () => dispatch(resetPlayersSelection())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Field);
