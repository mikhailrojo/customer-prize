const fs = require('fs');
const csv = require('fast-csv');
/*
 * Calculates price of the cubicle cm
 */
const calculateMaxValuable = (id, price, l, w, h) =>  (l * w * h) / price;

module.exports = async (quantity) => {
	const stream = fs.createReadStream("./products.csv").pipe(csv());
	const result = [];
	return new Promise((resolve, reject) => {
		stream
			.on("data", (data) => {
				if (quantity && result.length === quantity) {
					return resolve(result);
				}
				result.push(data.map(i => parseInt(i)));

			})
			.on("end", () => resolve(result))
			.on('data-invalid', () => reject('Invalid data'))
	}).then(unsortedArr => unsortedArr.sort((a, b) => calculateMaxValuable(...a) - calculateMaxValuable(...b)));
};