const cl = console.log;

module.exports = function(values, weights, W) {
	const m = [];

	for(let i = 0; i <= values.length; i ++){
		m.push([]);
	}

	for(let i = 0; i<= W; i++) {
		m[0].push(0);
	}

	for (let i = 1; i<= values.length; i ++) {
		for (let j = 0; j <= W; j++ ){
			const currentW = weights[i - 1]; // 5
			const prevRow = m[i - 1];

			if (currentW > j) { // если  5 > 0,1,2,3,4
				m[i][j] = prevRow[j];
			} else {
				m[i][j] = Math.max(prevRow[j], prevRow[j - currentW] + values[i - 1]);
			}
		}
		if (i>16000) {
			cl(i, ' из ', values.length);
		}

	}

	return m;
}
