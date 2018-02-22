const assert = require('assert');
const {
	getTotalSumOfIds,
	getTotalValue,
	getProductVol,
	getTotalVolume
} = require('../helpers');

const {mockArray} = require('./mock');
const getMatrix = require('../getMatrix');

describe('Helpers methods', () => {
	describe('getTotalSumOfIds', () => {
		it('should return sum of all ids', () => {
			const totalSum = getTotalSumOfIds(mockArray);
			assert.equal(totalSum, 666);
		});
	});

	describe('getTotalValue', () => {
		it('should sum of all prices', () => {
			const totalSum = getTotalValue(mockArray);
			assert.equal(totalSum, 111);
		});
	});

	describe('getProductVol', () => {
		it('should multiplication of all dimensions', () => {
			const totalSum = getProductVol(mockArray[0]);
			assert.equal(totalSum, 2 * 3 * 4);
		});
	});

	describe('getTotalVolume', () => {
		it('should multiplication of all dimensions', () => {
			const totalSum = getTotalVolume(mockArray);
			assert.equal(totalSum, 24024024);
		});
	});
})

describe('CreateMatrix', () => {
	it('should create empty matrix of the size of the array plus 1 if no second argument', () => {
		const matrix = getMatrix(mockArray);
		const {length} = mockArray;

		assert.equal(matrix.length, length + 1);
	});
	it('should create full matrix of the size of the array plus 1 and length of second argument plus 1', () => {
		const MAX_VOL = 1000;
		const matrix = getMatrix(mockArray, MAX_VOL);
		const {length} = mockArray;

		assert.equal(matrix.length, length + 1);
		assert.equal(matrix[0].length, MAX_VOL + 1);
		assert.equal(matrix[length].length, MAX_VOL + 1);
	});
})