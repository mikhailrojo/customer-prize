const fs = require('fs');
const csv = require('fast-csv');

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
	});
};