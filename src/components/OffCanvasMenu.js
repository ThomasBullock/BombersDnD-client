import React, { Component, Fragment } from 'react';
import Routes from '../routes/Routes';
import Drawer from 'material-ui/Drawer';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FormatIndentDecrease from 'material-ui-icons/FormatIndentDecrease';

import './OffCanvasMenu.scss';

class OffCanvasMenu extends Component {
  constructor () {  // move this to redux store!
    super();
    this.state = { open: false };
    this.toggleMenu = this.toggleMenu.bind(this);
  }	

  // Sidebar toggle
  toggleMenu() {
    this.setState(prevState => ({
      open: !prevState.open
    }));
  }

  onRequestChange(open) {
    console.log('drawer status changed')

  }
	
  render(){
  	return(
      <Fragment>  
  	    <Drawer open={this.state.open}
  	      className=""
          containerClassName="sidebar-initial-color"
          docked={false}
          onRequestChange={(open) => this.setState({open})}
  	    >

  	      <Routes />

  	    </Drawer>    	
        <FloatingActionButton className="open-drawer-btn"
          secondary={true}        
          onClick={this.toggleMenu}
        >
          <FormatIndentDecrease />
        </FloatingActionButton>
      </Fragment>    

  	)
	
  }
}

 
export default OffCanvasMenu;