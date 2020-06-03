const expect = require('chai').expect;
const fs = require('fs');

const lib = require('../src/lib.js');

describe('parse Marc record tests', () => {
	it('Creates a proper object', () => {
		let bib = lib.parseMarcData(marc_response);
		expect(bib).to.be.an("object");
		expect(bib.oclcNumber).to.equal(128807);
		expect(bib.title).to.equal(128807);
		expect(bib.author).to.equal(128807);
		expect(bib.isbns).to.equal(128807);
		expect(bib.mergedOCNs).to.equal(128807);
	});
});
