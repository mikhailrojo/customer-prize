'use strict';

const getArray = require('./getArray');
const matrix = require('./getMatrix');
const {printStats, getIndexesOfChosenItems, getLightestProducts} = require('./helpers');
const MAX_VOL = 45 * 30 * 35;

(async () => {
	try {
		// let's create an array out of all products
		const arrayOfNumbers = await getArray();

		// convert the array to the matrix
		const finalMatrix = matrix(arrayOfNumbers, MAX_VOL);

		// recreate back path of all items
		const chosenIndexes = getIndexesOfChosenItems(finalMatrix, MAX_VOL);

		// check whether we can light it up
		const lightestItems = getLightestProducts(arrayOfNumbers, chosenIndexes);

		// print out the statistics
		printStats(MAX_VOL, lightestItems);
	} catch (e) {
		console.log(e);
	}
})();
