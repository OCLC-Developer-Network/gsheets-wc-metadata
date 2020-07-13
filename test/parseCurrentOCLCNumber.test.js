const expect = require('chai').expect;
const fs = require('fs');
const gas = require('gas-local');

const lib = gas.require('./src');

currentOCN_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/currentOCN_response.json')).toString();
currentOCN_response_same = fs.readFileSync(require('path').resolve(__dirname, './mocks/currentOCN_response_same.json')).toString();

describe('parse current OCLC Number response', () => {
	it('parses response OCLC number different', () => {
		let currentOCLCNumber = lib.parseCurrentOCLCNumber(currentOCN_response);
		expect(currentOCLCNumber).to.equal('311684437');
	});
	
	it('parses response OCLC number same', () => {
		let currentOCLCNumber = lib.parseCurrentOCLCNumber(currentOCN_response_same);
		expect(currentOCLCNumber).to.equal('318877925');
	});
});
