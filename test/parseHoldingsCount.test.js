const expect = require('chai').expect;
const fs = require('fs');
const gas = require('gas-local');

const lib = gas.require('./src');

holding_count_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/holding_count_response.json')).toString();
holding_count_multiple_editions_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/holding_count_multiple_editions.json')).toString();

describe('parse holding count', () => {
	it('parses result with 1 edition', () => {
		let holdingCount = lib.parseHoldingsCount(holding_count_response);
		expect(holdingCount).to.equal(464);
	});
	
	it('parses result with multiple editions', () => {
		let holdingCount = lib.parseHoldingsCount(holding_count_multiple_editions_response);
		expect(holdingCount).to.equal(1734);
	});
});
