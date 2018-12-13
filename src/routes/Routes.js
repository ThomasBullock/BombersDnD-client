import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import MenuWithIcons from '../components/MenuWithIcons';

class Routes extends Component {
	render() {
		return(
			<div className="sidebar-nav">
				<MenuWithIcons />
			</div>		
		)
	}
}

export default Routes;