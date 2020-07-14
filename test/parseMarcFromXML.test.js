const expect = require('chai').expect;
const fs = require('fs');
const gas = require('gas-local');
const mocks = require("./mocks/gas-mocks");

const lib = gas.require('./src', mocks);

bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/bib.xml')).toString();
no_bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/no_bib.xml')).toString();

describe.skip('Handle parsing a Atom with embedded MARC record', () => {
	it('Returns MARC XML', () => {	    
		let record = lib.parseMarcFromXML(bib_response);
		expect(bib).to.be.an("object");
	});	
	
	it('Creates a handles bib which is an error', () => {		
		let record = lib.parseMarcData(no_bib_response);
		expect(record).to.be.an("object");
	});
});