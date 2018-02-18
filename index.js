'use strict';

const getArray = require('./getArray');
const {getStats, getProductVol, getFilledTote} = require('./helpers');
const MAX_VOL = 45 * 30 * 35;

(async () => {
	try {
		const sortedArr = await getArray();
		const chosenItems = getFilledTote(sortedArr, MAX_VOL);

		getStats(MAX_VOL, chosenItems);
	} catch (e) {
		console.log(e);
	}
})();


