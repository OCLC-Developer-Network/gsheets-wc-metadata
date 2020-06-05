const expect = require('chai').expect;
const fs = require('fs');

var gas = require('gas-local');

const lib = gas.require('./src');

marc_record = fs.readFileSync(require('path').resolve(__dirname, './mocks/marc_record.xml')).toString();

describe('parse bib json tests', () => {
	it('Creates a proper object', () => {
		let bib = lib.parseMarcData(marc_record);
		expect(bib).to.be.an("object");
		expect(bib.oclcNumber).to.equal(128807);
		expect(bib.title).to.equal(128807);
		expect(bib.author).to.equal(128807);
		expect(bib.isbns).to.equal(128807);
		expect(bib.mergedOCNs).to.equal(128807);
	});
});
