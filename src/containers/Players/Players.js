import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { bindActionCreators } from 'redux';
import './Players.scss';
import PlayerCard from '../../components/Card';
import PlayerList from '../../components/PlayerList';
import Loader from '../../components/common/Loader';

// import { playerSelector } from 

import { array, bool, func, number, object, string } from 'prop-types';

import {
  changePlayerSelectionStatus,
  resetPlayersSelection,
  playerSelector
} from '../../modules/i_players';
import { selectPlayer } from '../../modules/player';
import { addPlayer, removePlayer, resetSquad } from '../../modules/i_squad';

class Players extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: "default"
    }
  }

  addPlayerHandler(playerId, positionId) {
    return () => {
      const { squad } = this.props;
      const targetPosPlayer = squad.getIn([positionId, 'playerId'])
      // position already contains same player
        // return
      if(targetPosPlayer === playerId) {
        return;
      // An empty position
      } else if(targetPosPlayer === null) {
        // Add player and change players selection status
          if(squad.filter(pos => pos.playerId === playerId).length === 0) {
            this.props.changePlayerSelectionStatus(playerId);  // need to add a true / false overide paramater    
          }  
          this.props.addPlayer(playerId, positionId);
      } else if(targetPosPlayer !== null && targetPosPlayer !== playerId) {
            // Position contains another player
          // change existing players selection status
          this.props.changePlayerSelectionStatus(targetPosPlayer);   
          // Add player and change players selection status
          this.props.addPlayer(playerId, positionId);
          this.props.changePlayerSelectionStatus(playerId);     
      } 
    };
  }

  resetHandler() {
    return () => {
      console.log('reset');
      this.props.resetSquad();
      this.props.resetPlayersSelection();
    };
  }

  handleFilterChange = (event, index, value) => this.setState({ filter: value })

  render() {
    const { players, squad } = this.props;
    console.log(players, squad);
    console.log(players.size)
    const selected = players.size > 1 && players.get(0);
    // console.log(selected.toJS());
    if(this.props.selectedPosition) {
      console.log(this.props.selected.get('name'), this.props.selectedPosition.get('id'));
    }
    // console.log(typeof this.addPlayerHandler(this.props.selected.id, this.props.selectedPosition.id));
    if (players) {
      return (
        <div className="col-lg-3">
          { (players.size > 1) ?
          <PlayerCard
            player={this.props.selected}
            addPlayer={this.addPlayerHandler(this.props.selected.get('id'), this.props.selectedPosition.get('id'))}
            removePlayer={this.props.removePlayer}
            resetHandler={this.resetHandler()}
            resetSquad={this.props.resetSquad}
            resetPlayersSelection={this.props.resetPlayersSelection} 
          /> : 
          (
            <Loader />
          )    
          }
          <div className="players__control">
            <SelectField className="players__filter"
              floatingLabelText="List Filter"
              value={this.state.value}
              onChange={this.handleFilterChange}
              style={{width: '100%'}}         
            >
              <MenuItem value="Current List" primaryText="Current List" />
              <MenuItem value="Available" primaryText="Available" />
              <MenuItem value="Injured" primaryText="Injured" />
              <MenuItem value="Suspended" primaryText="Suspended" />
              <MenuItem value="Retired" primaryText="Retired" />
              <MenuItem value="Under 21" primaryText="Under 21" />
              <MenuItem value="Played 50 Games or more" primaryText="Played 50 Games or more" />

            </SelectField >
          </div>
          {(players.size > 1) ?
          (<PlayerList
            filter={this.state.filter}
            squad={squad}
            playingList={players}
            selectHandler={this.props.selectPlayer}
            addPlayer={this.props.addPlayer}
            changePlayerSelectionStatus={this.props.changePlayerSelectionStatus}
          />)
          :
          (
            <Loader />
          )
          }
        </div>
      );
    } else {
      return (
        <div className="col col-3">
          <p>Loading</p>
        </div>
      );
    }
  }
}

Players.propTypes = {
  addPlayer: func.isRequired,
  changePlayerSelectionStatus: func.isRequired,
  resetPlayersSelection: func.isRequired,
  resetSquad: func.isRequired,
  players: object.isRequired,
  removePlayer: func.isRequired,
  selectPlayer: func.isRequired,
  squad: object.isRequired,
}

const mapStateToProps = state => {
  // console.log(state.get('players'))
  // console.log(state.get('squad').filter(pos => {
  //   // console.log(pos.get('selected'))
  //   return pos.get('selected') === true
  // }))
  return {
    selectedPlayer: playerSelector(state.get('players')),
    squad: state.get('squad'), //state.squad,
    // players: state.players,
    players: state.get('players'),
    selected: state.getIn(['players', state.get('player')]),  //players[state.player],
    selectedPosition: state.get('squad').filter(pos => pos.get('selected') === true).get(0) || state.getIn(['squad', 0]),   //state.squad.filter((item, i) => {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectPlayer: id => dispatch(selectPlayer(id)),
    addPlayer: (playerId, positionId) => dispatch(addPlayer(playerId, positionId)),
    removePlayer: position => dispatch(removePlayer(position)),
    resetSquad: () => dispatch(resetSquad()),
    changePlayerSelectionStatus: playerId =>
      dispatch(changePlayerSelectionStatus(playerId)),
    resetPlayersSelection: () => dispatch(resetPlayersSelection())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Players);
