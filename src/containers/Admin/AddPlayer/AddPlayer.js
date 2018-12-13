import React, { Component } from 'react';
import { connect } from 'react-redux';
import { array, bool, func, number, object, string } from 'prop-types';
import DateSelector from '../../../components/common/DateSelector';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Save from 'material-ui-icons/Save';
import './AddPlayer.scss';

import { addPlayerToDatabase } from '../../../modules/players';

class AddPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: '',
      name: '',
      surname: '',
      primary: '',
      secondary: '',
      status: 'Available',
      height: '',
      dob: '',
      games: '',
      goals: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event, index, value) {
    console.dir(event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSelectChange = type => (event, index, value) => {
    console.dir(event.target.name);
    this.setState({
      [type]: value
    });
  };

  handleDateChange(event, value) {
    console.log(event);
    this.setState({
      dob: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // fire action
    console.log('we will send', this.state);
    this.props.submitPlayer(this.state);
  }

  render() {
    const defaultDate = new Date('1993-10-10');
    return (
      <div className="addplayer">
        <h2>Add A Player to Database</h2>
        <form onSubmit={this.handleSubmit}>
          <TextField
            required
            className="form__input"
            name="name"
            hintText="Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <TextField
            required
            className="form__input"
            name="surname"
            hintText="Surname"
            value={this.state.surname}
            onChange={this.handleChange}
          />
          <TextField
            required
            className="form__input"
            name="number"
            hintText="Number"
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
          <DatePicker
            name="dob"
            hintText="Landscape Dialog"
            mode="landscape"
            defaultDate={defaultDate}
            onChange={this.handleDateChange}
          />

          <RaisedButton
            onClick={this.handleSubmit}
            label="Save"
            secondary={true}
            icon={<Save />}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    submitPlayer: player => dispatch(addPlayerToDatabase(player))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddPlayer);
