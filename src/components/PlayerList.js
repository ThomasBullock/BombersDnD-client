import React from 'react';
import { array, func, number, string  } from 'prop-types';
import {GridList, GridTile} from 'material-ui/GridList';
import moment from 'moment';
import Player from './Player';
import './PlayerList.scss';


const applyFilters = (playingList, filter) => {
  switch (filter) {
    case "Current List":
      return playingList.filter((player) => player.status !== "Retired");    
    case "Available":
      return playingList.filter((player) => player.status === "Available");
    case "Injured":
      return playingList.filter((player) => player.status === "Injured");
    case "Suspended":
      return playingList.filter((player) => player.status === "Suspended");    
    case "Retired":
      return playingList.filter((player) => player.status === "Retired");   
    case "Played 50 Games or more":
      return playingList.filter((player) => player.games >= 50 && player.status !== "Retired");   
    case "Under 21":
      return playingList.filter((player) => moment().diff(player.dob, 'years') < 21 && player.status !== "Retired");                              
    default: 
      return playingList;
  }
}

const iterateList = (players, selectHandler, addPlayer, changePlayerSelectionStatus) => {
  return players.map((player, i) => {
    return (
      <GridTile key={i} 
        title={`${player.name.substring(0, 1)}. ${player.surname}`} 
        subtitle={<span style={{zIndex: '600', color: '#000'}} >{player.status}</span>}
        titleBackground={'rgba(0, 0, 0, 0.4)'} 
        titlePosition={'bottom'}
        style={{background: '#FFFFFF', opacity: '1', color: '#000'}}
        titleStyle={{fontSize: '14px',   fontWeight: '600', color: '#000'}}
        className="playerlist__playerWrapper">
        <Player key={i} id={player.id} player={player} inSquad={player.inSquad} selectHandler={selectHandler} addPlayer={addPlayer} changePlayerSelectionStatus={changePlayerSelectionStatus} />
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
  playingList: array.isRequired,
  selectHandler: func.isRequired,
};

export default PlayerList;
