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
const getStats = (maxVol, arr) => {
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

module.exports = {
	getStats,
	getProductVol,
	getFilledTote
};