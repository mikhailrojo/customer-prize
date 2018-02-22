'use strict';

const {getProductVol} = require('./helpers');

module.exports = function(array, W = 0) {
	const values = array.map(i => i[1]);
	const weights = array.map(i => getProductVol(i));
	const m = [];

	for(let i = 0; i <= values.length; i ++){
		m.push([]);
	}

	for(let i = 0; i<= W; i++) {
		m[0].push(0);
	}

	for (let i = 1; i <= values.length; i ++) {
		for (let j = 0; j <= W; j++ ){
			const currentW = weights[i - 1]; // 5
			const prevRow = m[i - 1];

			if (currentW > j) {
				m[i][j] = prevRow[j];
			} else {
				m[i][j] = Math.max(prevRow[j], prevRow[j - currentW] + values[i - 1]);
			}
		}
	}
	return m;
}
