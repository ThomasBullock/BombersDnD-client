import React from 'react';
import blank from '../../img/Blank_t.png';
import '../Player.scss';

const NoPlayer = () => {
    return (
        <div className="player__img-wrapper">
            <img className="player__img" src={blank} alt="A siloutte of a football player"/>
        </div>
    );
};

export default NoPlayer;