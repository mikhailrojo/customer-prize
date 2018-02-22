const cl = console.log;

/**
 * Gets price of items in the array
 * @param {Object[]} arr array of products
 */
const getTotalSum = (arr) => arr.reduce((acc, product) => acc + product[0], 0);

/**
 * Gets total value of all items
 * @param {Object[]} arr array of products
 */
const getTotalValue = (arr) => arr.reduce((acc, product) => acc + product[1], 0);

/**
 * Gets item volume
 * @param {Number} l length
 * @param {Number} w width
 * @param {Number} h height
 */
const getProductVol = ([,,l, w, h]) => l * w * h;

/**
 * Get volume of all items in the array
 * @param {Object[]} arr array of products
 */
const getTotalVolume = (arr) => arr.reduce((acc, [,,l, w, h]) => acc + (l * w * h), 0);

/**
 * Prints out statistics
 * @param {Number} maxVol max tote capacity
 * @param {Object[]} arr array of chosen products
 */
const printStats = (maxVol, arr) => {
	const totalSum = getTotalSum(arr);
	const totalValue = getTotalValue(arr);
	const totalVolume = getTotalVolume(arr);

	cl(`Maximum tote volume - ${maxVol} cm3`);
	cl(`Total value collected - ${totalValue/100} $`);
	cl(`Collected tote volume - ${totalVolume} cm3`);
	cl(`Collected tote item count - ${arr.length} items`);

	cl(`Email should be ${totalSum}@redmart.com`)
};

/**
 *
 * @param {Object[]} arr array of all products
 * @param {Number} maxVol max tote capacity
 * @returns {Array} array of chosen products
 * @param maxVol
 */
const getFilledTote = (arr, maxVol) => {
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
};

/**
 * From the given matrix returns indexes of the most valuable items
 * @param { number[][] } m matrix
 * @param {number} W maximum capacity volume
 * @returns {number[]}
 */
const getIndexesOfChosenItems = (m, W) => {
	const weight = m.map(i => i[5]);
	const length = weight.length;
	let result = '';
	let lastJ = W;
	let lastI = length;
	let lastVal = m[lastI][lastJ];

	while(lastI) {
		lastI--;
		let isCopiedFromAbove = lastVal === m[lastI][lastJ];
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

/**
 * Return the lightest products of the save volume and weight as of chosen
 * @param {number[]} array all products
 * @param chosenIndexes chosen indexes
 * @returns {Array} lightest items
 */
const getLightestProducts = (array, chosenIndexes) => {
	const foundProducts = array.filter((product, index) => chosenIndexes.includes(index));
	const lightestItems = [];

	for (let i = 0; i < foundProducts.length; i++) {
		const volume = getProductVol(foundProducts[i]);
		const [, price, , , , weight] = foundProducts[i];
		const lighterItem = array.find(product => {
			const [, foundPrice, , , , foundWeight] = product;
			if (volume === getProductVol(product) && price === foundPrice && weight > foundWeight) {
				return product;
			}
		});

		lightestItems.push(lighterItem || foundProducts[i]);
	}
	return lightestItems;
}

module.exports = {
	printStats,
	getProductVol,
	getIndexesOfChosenItems,
	getLightestProducts
};
