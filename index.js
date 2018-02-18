'use strict';

const calculateMaxValuable = ([id, price, l, w, h]) => price / (l * w * h);

const getArray = require('./getArray');
const {getStats, getProductVol} = require('./helpers');
const MAX_VOL = 45 * 30 * 35;
const cl = console.log;

(async () => {
	try {
		const sortedArr = await getArray();
		const chosenItems = getFilledTote(sortedArr, MAX_VOL);

		getStats(MAX_VOL, chosenItems);
	} catch (e) {
		cl(e);
	}
})();


function getFilledTote(arr, maxVol) {
	let currentVolumeFilled = 0;
	const chosenItems = [];
	const len = arr.length;

	for (let i = 0; i < len; i++) {

		if (currentVolumeFilled === maxVol) break;
		const currentItemVolume = getProductVol(arr[i]);
		const isItemFillable = currentVolumeFilled + currentItemVolume <= maxVol;

		if (isItemFillable) {
			currentVolumeFilled += currentItemVolume;
			chosenItems.push(arr[i]);
		}
	}

	return chosenItems;
}
