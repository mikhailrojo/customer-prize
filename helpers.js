const cl = console.log;
const getTotalSum = (arr) => arr.reduce((acc, product) => acc + product[0], 0);
const getTotalValue = (arr) => arr.reduce((acc, product) => acc + product[1], 0);
const getProductVol = ([,,l, w, h]) => l * w * h;
const getTotalVolume = (arr) => arr.reduce((acc, [,,l, w, h]) => acc + (l * w * h), 0);

const getStats = (maxVol, arr) => {
	const totalSum = getTotalSum(arr);
	const totalValue = getTotalValue(arr);
	const totalVolume = getTotalVolume(arr);

	cl(`Maximum tote volume - ${maxVol}`);
	cl(`Total value collected - ${totalValue/100} $`);
	cl(`Collected tote volume - ${totalVolume} cm3`);
	cl(`Collected tote item count - ${arr.length} items`);

	cl(`Email should be ${totalSum}@redmart.com`)
};

module.exports = {
	getStats,
	getProductVol
};