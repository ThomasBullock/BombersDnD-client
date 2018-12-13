import React from 'react';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RemoveRedEye from 'material-ui/svg-icons/image/remove-red-eye';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import { Link } from 'react-router-dom';

const style = {
  paper: {
    display: 'inline-block',
    float: 'left',
    margin: '16px 32px 16px 0',
  },
  rightIcon: {
    textAlign: 'center',
    lineHeight: '24px',
  },
};

const MenuWithIcons = () => (
  <div>
    <Paper style={style.paper}>
      <Menu>
        <MenuItem 
          primaryText="Squad Selector" 
          leftIcon={<PersonAdd />} 
          linkbutton="true"
          containerElement={<Link to="/"/>}  
        />
        <MenuItem 
          primaryText="Inspiring Bomber Vids" 
          leftIcon={<RemoveRedEye />} 
          linkbutton="true"
          containerElement={<Link to="/videos"/>}  
        />
        <Divider />
        <MenuItem 
          primaryText="Admin Area" 
          leftIcon={<RemoveRedEye />} 
          linkbutton="true"
          containerElement={<Link to="/admin"/>}  
        />
      </Menu>
    </Paper>
  </div>
);

export default MenuWithIcons;
