import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { bindActionCreators } from 'redux';
import './Players.scss';
import PlayerCard from '../../components/Card';
import PlayerList from '../../components/PlayerList';
import Loader from '../../components/common/Loader';

import { array, bool, func, number, object, string } from 'prop-types';

import {
  changePlayerSelectionStatus,
  resetPlayersSelection
} from '../../modules/players';
import { selectPlayer } from '../../modules/player';
import { addPlayer, removePlayer, resetSquad } from '../../modules/squad';

class Players extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: "default"
    }
  }

  addPlayerHandler(playerId, positionId) {
    return () => {
      console.log('handler fired')
      // console.log(arguments);
      console.log(this.props.squad[positionId].playerId)
      const { squad } = this.props;
      // position already contains same player
        // return
      if(squad[positionId].playerId === playerId) {
        console.log(`pos contains ${squad[positionId].playerId} trying to add ${playerId}`);
        return;
      // An empty position
      } else if(squad[positionId].playerId === null) {
        // Add player and change players selection status
        console.log('An empty position Add player and change players selection status');
          if(squad.filter(pos => pos.playerId === playerId).length === 0) {
            console.log('yes')
            this.props.changePlayerSelectionStatus(playerId);  // need to add a true / false overide paramater    
          }  
          this.props.addPlayer(playerId, positionId);
      } else if(squad[positionId].playerId !== null && squad[positionId].playerId !== playerId) {
            // Position contains another player
          // change existing players selection status
          this.props.changePlayerSelectionStatus(squad[positionId].playerId);   
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
    const selected = players.length > 1 && players[0];
    // console.log(typeof this.addPlayerHandler(this.props.selected.id, this.props.selectedPosition.id));
    if (players) {
      return (
        <div className="col-lg-3">
          { (players.length > 1) ?
          <PlayerCard
            player={this.props.selected}
            addPlayer={this.addPlayerHandler(this.props.selected.id, this.props.selectedPosition.id)}
            removePlayer={this.props.removePlayer}
            resetHandler={this.resetHandler()}
            resetSquad={this.props.resetSquad}
            resetPlayersSelection={this.props.resetPlayersSelection}
            selectedPosition={this.props.selectedPosition}
            
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
          {(players.length > 1) ?
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
  players: array.isRequired,
  removePlayer: func.isRequired,
  selectPlayer: func.isRequired,
  squad: array.isRequired,
}

const mapStateToProps = state => {
  return {
    squad: state.squad,
    players: state.players,
    selected: state.players[state.player],
    selectedPosition: state.squad.filter((item, i) => {
      if (item.selected === true) {
        return item;
      }
    })[0]
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
