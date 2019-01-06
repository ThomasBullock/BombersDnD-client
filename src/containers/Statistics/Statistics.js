import React, { Component } from 'react';
import { array, bool, func, number, object, string } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import './Statistics.scss';

class Statistics extends Component {
    averageStat = (property, type) => {
        let players = 0;
        const total = this.props.selectedPlayers.reduce( (accumulator, currentValue, i, arr) => {
            if(type) {
                if(currentValue) {
                    players++;
                    return accumulator += ( currentValue[property] / currentValue.games_18);
                } else {
                    return 0;
                }

            } else {
                if(currentValue) {
                    players++;
                    return accumulator += currentValue[property];
                } else {
                    return 0;
                }
            }   

        }, 0)
        return (total !== 0) ? (total / this.props.selectedPlayers.length).toFixed(1) : 0;
    }


    averageAge = () => {
        let players = 0;

        const total = this.props.selectedPlayers.reduce( (accumulator, currentValue, i, arr) => {    
            if(currentValue) {
                players++;
                return accumulator += moment().diff(currentValue.dob, 'years');
            } else {
                return 0;
            }
        }, 0)
        return (total !== 0) ? (total / this.props.selectedPlayers.length).toFixed(1) : 0;        
    }

    render() {
        return (
            <div className="col-lg-2 statistics">
                <h2 className="statistics__heading">Averages</h2>
                <ul className="statistics__list">
                    <li><span>Age: </span><span>{this.props.squad && this.averageAge()}</span></li>
                    <li><span>Height: </span><span>{this.props.squad && this.averageStat('height', null)}</span></li>
                    <li><span>Games: </span><span>{this.props.squad && this.averageStat('games', null)}</span></li>
                </ul>
                <h2 className="statistics__heading">{moment(Date.now()).format('YYYY')}</h2>
                <ul className="statistics__list">
                    <li><span>Goals: </span><span>{this.props.squad && this.averageStat('goals_18', true)}</span></li>
                    <li><span>Disposals: </span><span>{this.props.squad && this.averageStat('disposals_18')}</span></li>
                    <li><span>Tackles: </span><span>{this.props.squad && this.averageStat('tackles_18')}</span></li>
                </ul>                       
            </div>
        );
    }
}

Statistics.propTypes = {
    selectedPlayers: array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        squad: state.squad,
        players: state.players
    }
}

export default connect(mapStateToProps)(Statistics);