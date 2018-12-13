import React, { Component } from 'react';
import { array, bool, func, number, object, string } from 'prop-types';

const Videos = () => {
	return(
		<div>
			<iframe width="560" height="315" src="https://www.youtube.com/embed/38DVpvVIO-0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
		</div>
	)
}


Videos.propTypes = {
	videos: array
}

export default Videos;  