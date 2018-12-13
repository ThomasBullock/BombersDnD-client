import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Edit from 'material-ui-icons/Edit';
import Delete from 'material-ui-icons/Delete';
import Avatar from 'material-ui/Avatar';
import AddPlayer from './AddPlayer/AddPlayer';

const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
    listItem: {
    },
    details: {

    },
    buttons: {
        marginLeft: '50px'
    }
};

class Admin extends Component{
    constructor(props) {
        super(props);

        this.state = {
            value: 'Player List',
        };
    }

    handleChange = (value) => {
        this.setState({
          value: value,
        });
    };

    render() {
        const { players } = this.props;
        console.log(players)
        return (
            <div className="admin">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="Player List" value="Player List">
                    <div>
                    <List>
                        {players.map( (player) => {
                            return(
                            <ListItem 
                                className="poo"
                                style={styles.listItem}
                                key={player.id}
                                leftAvatar={<Avatar src={player.imageUrl} />}
                                primaryText={`${player.name} ${player.surname}`}
                                rightIconButton={<Link to={`/player/${player.id}/edit`}><Edit /></Link>}
                            >
      
                            </ListItem>
                            )
                        })}
                    </List>    
                    </div>
                    </Tab>
                    <Tab label="Add Player" value="Add Player">
                        <AddPlayer />
                    </Tab>
                </Tabs>
            </div>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        players: state.players
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        propName: () => {
            // dispatch(value())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);