const expect = require('chai').expect;
const fs = require('fs');

var gas = require('gas-local');

const lib = gas.require('./src');

read_bib = fs.readFileSync(require('path').resolve(__dirname, './mocks/read_bib.xml')).toString();

describe('parse bib json tests', () => {
	it('Creates a proper object', () => {
		let record = lib.parseMARCFromXML(read_bib);
		expect(record).to.be.an("object");
	});
});
