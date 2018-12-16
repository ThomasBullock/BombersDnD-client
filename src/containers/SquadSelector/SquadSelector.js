import React, { Component } from 'react';
import { array, func, object } from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { requestPlayerList } from '../../modules/players';

import Field from '../Field/Field';
import Players from '../Players/Players';

class SquadSelector extends Component {

  render() {
    const { players } = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <Field />
          <Players />
        </div>
      </div>
    );
  }
}

SquadSelector.propTypes = {
  players: object.isRequired,
  requestPlayerList: func.isRequired
};

const mapStateToProps = state => {
  return {
    players: state.get('players')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestPlayerList: () => dispatch(requestPlayerList())
  };
};

SquadSelector = DragDropContext(HTML5Backend)(SquadSelector);
export default connect(mapStateToProps, mapDispatchToProps)(SquadSelector);
