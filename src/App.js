import React, { Component } from 'react';
import { array, object } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'; 
import RoutesComponent from './routes/RoutesComponent';

import './App.scss';

import OffCanvasMenu from './components/OffCanvasMenu';
import { fetchPlayers } from './modules/players';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
// import myFootyTeamTheme from './styles/myFootyTeamTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
	componentWillMount() {
		this.props.fetchPlayers();
	}

  render() {
  	return (
			<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
		    <div className="app">
					<OffCanvasMenu />
		    	<RoutesComponent />
		    </div>
	    </MuiThemeProvider>  	
  	)

  }
}	

App.propTypes = {
	players: object.isRequired
}

const mapStateToProps = (state) => {
	return {
		players: state.get('players')
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPlayers: () => dispatch(fetchPlayers())
	}
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));