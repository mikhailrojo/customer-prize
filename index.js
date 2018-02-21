'use strict';

const getArray = require('./getArray');
const {getStats, getProductVol, getFilledTote} = require('./helpers');
const MAX_VOL = 45 * 30 * 35;
const matrix = require('./i');

(async () => {
	try {
		const sortedArr = await getArray();
		const values = sortedArr.map(i => i[1]);

		const weights = sortedArr.map(i => getProductVol(i));

		const m = matrix(values, weights, MAX_VOL);
		const pathArr = createPath(m, values.length, MAX_VOL, weights);

		cl(pathArr);

		saveString(JSON.stringify(m), 'matrix');
		saveString(JSON.stringify(pathArr), 'arr');

	//	const chosenItems = getFilledTote(sortedArr, MAX_VOL);
		//getStats(MAX_VOL, chosenItems);
	} catch (e) {
		console.log(e);
	}
})();

function createPath(m, length, W, weight) {
	'use strict';
	let result = '';
	let lastJ = W;
	let lastI = length;
	let lastVal = m[lastI][lastJ];

	while(lastI) {
		lastI--;
		let isCopiedFromAbove = lastVal == m[lastI][lastJ];
		if(isCopiedFromAbove) {
			lastVal = m[lastI][lastJ];
		} else {
			lastVal = m[lastI][lastJ - weight[lastI]];
			result += `.${lastI}`;
			lastJ -= weight[lastI];
		}

	}

	return result.split('.').reverse().filter(i => i);

}


function saveString(string, name) {
	'use strict'
	const fs = require('fs');
	fs.writeFile(`./${name}`, string, (err, data) => {
		if (err) cl(err);
		console.log(`Saved! ${name}`)
	});

}