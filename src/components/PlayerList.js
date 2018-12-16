import React from 'react';
import { array, func, number, string, object  } from 'prop-types';
import {GridList, GridTile} from 'material-ui/GridList';
import moment from 'moment';
import Player from './Player';
import './PlayerList.scss';


const applyFilters = (playingList, filter) => {
  switch (filter) {
    case "Current List":
      return playingList.filter((player) => player.get('status') !== "Retired");    
    case "Available":
      return playingList.filter((player) => player.get('status') === "Available");
    case "Injured":
      return playingList.filter((player) => player.get('status') === "Injured");
    case "Suspended":
      return playingList.filter((player) => player.get('status') === "Suspended");    
    case "Retired":
      return playingList.filter((player) => player.get('status') === "Retired");   
    case "Played 50 Games or more":
      return playingList.filter((player) => player.get('games') >= 50 && player.get('status') !== "Retired");   
    case "Under 21":
      return playingList.filter((player) => moment().diff(player.get('dob'), 'years') < 21 && player.get('status') !== "Retired");                              
    default: 
      return playingList;
  }
}

const iterateList = (players, selectHandler, addPlayer, changePlayerSelectionStatus) => {
  // console.log(players.toJS());
  return players.map((player, i) => {
    // console.log(player.toJS());
    return (
      <GridTile key={i} 
        title={`${player.get('name').substring(0, 1)}. ${player.get('surname')}`} 
        subtitle={<span style={{zIndex: '600', color: '#000'}} >{player.get('status')}</span>}
        titleBackground={'rgba(0, 0, 0, 0.4)'} 
        titlePosition={'bottom'}
        style={{background: '#FFFFFF', opacity: '1', color: '#000'}}
        titleStyle={{fontSize: '14px',   fontWeight: '600', color: '#000'}}
        className="playerlist__playerWrapper">
        <Player key={i} id={player.get('id')} player={player} inSquad={player.get('inSquad')} selectHandler={selectHandler} addPlayer={addPlayer} changePlayerSelectionStatus={changePlayerSelectionStatus} />
      </GridTile>
    );
  });
};

const PlayerList = (props) => {
  const { playingList, selectHandler, addPlayer, changePlayerSelectionStatus, filter } = props;
  return (
    <GridList cellHeight={154} cols={3} className="playerlist">
      {iterateList(applyFilters(playingList, filter), selectHandler, addPlayer, changePlayerSelectionStatus)}
    </GridList>
  );
};

PlayerList.propTypes = {
  playingList: object.isRequired,
  selectHandler: func.isRequired,
};

export default PlayerList;
