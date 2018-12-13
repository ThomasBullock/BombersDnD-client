import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DateSelector from '../../../components/common/DateSelector';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Delete from 'material-ui-icons/Delete';
import Save from 'material-ui-icons/Save';
import Cancel from 'material-ui-icons/Cancel';
import Loader from '../../../components/common/Loader';

import {
  updatePlayerInDatabase,
  deletePlayerFromDatabase
} from '../../../modules/players';

class EditPlayer extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    const { player } = props;
    this.state = {
      id: player && player.id,
      number: player && player.number,
      name: player && player.name,
      imageUrl: player && player.imageUrl,
      surname: player && player.surname,
      primary: player && player.primary,
      secondary: player && player.secondary ? player && player.secondary : '',
      status: player && player.status,
      height: player && player.height,
      dob: player && player.dob,
      games: player && player.games,
      goals: player && player.goals,
      games_18: player && player.games_18,
      goals_18: player && player.goals_18,
      tackles_18: player && player.tackles_18,
      disposals_18: player && player.disposals_18
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  componentWillMount() {
    console.log(this.props);
    if (!this.props.player) {
      // this.props.history.push('/admin');
    }
  }

  handleChange(event, index, value) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSelectChange = type => (event, index, value) => {
    // console.dir(event.target.name);
    this.setState({
      [type]: value
    });
  };

  handleDateChange(event, value) {
    this.setState({
      dob: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // fire action
    console.log('we will update', this.state);
    this.props.updatePlayer(this.state);
  }

  handleDelete() {
    this.props.deletePlayer(this.props.player);
    this.props.history.push('/admin');
  }

  handleBack() {
    this.props.history.push('/admin');
  }

  render() {
    console.log(this.props);

    const { player } = this.props;
    return (
      <div>
        {player ? (
          <Fragment>
            <h2>Edit {`${player.name} ${player.surname}`}</h2>
            <RaisedButton
              onClick={this.handleDelete}
              label="Delete"
              secondary={true}
              icon={<Delete />}
            />
            <form onSubmit={this.handleSubmit}>
              <TextField
                required
                className="form__input"
                name="name"
                hintText="Name"
                floatingLabelFixed={true}
                floatingLabelText="Name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <TextField
                required
                className="form__input"
                name="surname"
                hintText="Surname"
                floatingLabelFixed={true}
                floatingLabelText="Surname"
                value={this.state.surname}
                onChange={this.handleChange}
              />
              <TextField
                required
                className="form__input"
                name="number"
                hintText="Number"
                floatingLabelFixed={true}
                floatingLabelText="Number"
                value={this.state.number}
                onChange={this.handleChange}
              />
              <SelectField
                name="primary"
                floatingLabelText="Primary Position"
                value={this.state.primary}
                onChange={this.handleSelectChange('primary')}>
                <MenuItem value={'Forward'} primaryText="Forward" />
                <MenuItem value={'Midfielder'} primaryText="Midfielder" />
                <MenuItem value={'Defender'} primaryText="Defender" />
                <MenuItem value={'Ruck'} primaryText="Ruck" />
                <MenuItem value={'Utility'} primaryText="Utility" />
              </SelectField>
              <SelectField
                name="secondary"
                floatingLabelText="Secondary Position"
                value={this.state.secondary}
                onChange={this.handleSelectChange('secondary')}>
                <MenuItem value={'Forward'} primaryText="Forward" />
                <MenuItem value={'Midfielder'} primaryText="Midfielder" />
                <MenuItem value={'Defender'} primaryText="Defender" />
                <MenuItem value={'Ruck'} primaryText="Ruck" />
                <MenuItem value={'Utility'} primaryText="Utility" />
              </SelectField>
              <TextField
                className="form__input"
                name="height"
                hintText="Height"
                floatingLabelFixed={true}
                floatingLabelText="Height"
                value={this.state.height}
                onChange={this.handleChange}
              />
              <SelectField
                floatingLabelText="Status"
                value={this.state.status}
                onChange={this.handleSelectChange('status')}>
                <MenuItem value={'Available'} primaryText="Available" />
                <MenuItem value={'Injured'} primaryText="Injured" />
                <MenuItem value={'Suspended'} primaryText="Suspended" />
                <MenuItem value={'Retired'} primaryText="Retired" />
              </SelectField>
              <TextField
                className="form__input"
                name="games"
                hintText="Games"
                value={this.state.games}
                onChange={this.handleChange}
              />
              <TextField
                className="form__input"
                name="goals"
                hintText="Goals"
                value={this.state.goals}
                onChange={this.handleChange}
              />
              <TextField
                className="form__input"
                name="goals"
                hintText="Goals"
                value={this.state.goals}
                onChange={this.handleChange}
              />
              <DatePicker
                name="dob"
                hintText="Landscape Dialog"
                mode="landscape"
                defaultDate={new Date(this.state.dob)}
                onChange={this.handleDateChange}
              />
              <h4>2018 Statistics</h4>
              <TextField
                className="form__input"
                name="games_18"
                hintText="Games 2018"
                floatingLabelFixed={true}
                floatingLabelText="Games 2018"
                value={this.state.games_18}
                onChange={this.handleChange}
              />
              <TextField
                className="form__input"
                name="goals_18"
                hintText="goals 2018"
                floatingLabelFixed={true}
                floatingLabelText="Goals 2018"
                value={this.state.goals_18}
                onChange={this.handleChange}
              />
              <TextField
                className="form__input"
                name="tackles_18"
                hintText="Tackles 2018"
                floatingLabelFixed={true}
                floatingLabelText="Tackles 2018"
                value={this.state.tackles_18}
                onChange={this.handleChange}
              />
              <TextField
                className="form__input"
                name="disposals_18"
                hintText="Disposals 2018"
                floatingLabelFixed={true}
                floatingLabelText="Disposals 2018"
                value={this.state.disposals_18}
                onChange={this.handleChange}
              />
              <RaisedButton
                onClick={this.handleSubmit}
                label="Save"
                secondary={true}
                icon={<Save />}
              />
              <RaisedButton
                onClick={this.handleBack}
                label="Cancel"
                secondary={true}
                icon={<Cancel />}
              />
            </form>
          </Fragment>
        ) : (
          <Loader />
        )
        }
      </div>
    );
  }
}

EditPlayer.propTypes = {
  player: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps);
  // this a hack to get around the id being a string from mockAPI in dev 
  // and a number from mysql DB in production
  const convertInt = (id) => {
    if(process.env.NODE_ENV === 'production') {
      return parseInt(id);
    } else {
      return id;
    }
  }

  return {
    players: state.players,
    player: state.players.filter(
      item => item.id === convertInt(ownProps.match.params.id)
    )[0]
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updatePlayer: player => dispatch(updatePlayerInDatabase(player)),
    deletePlayer: player => dispatch(deletePlayerFromDatabase(player))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPlayer);


