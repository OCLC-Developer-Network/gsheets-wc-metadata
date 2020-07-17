const expect = require('chai').expect;
const fs = require('fs');
const dom = require('xmldom').DOMParser

const lib =require('../lib/marc-lib');

bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/bib.xml')).toString();
no_bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/no_bib.xml')).toString();

describe.only('Handle parsing a Atom with embedded MARC record', () => {
	it('Returns MARC XML', () => {	    
		let record = lib.parseMARCFromXML(bib_response);
		expect(record).to.be.a("string");
		var doc = new dom().parseFromString(record)
		expect(doc).to.be.an('object')
	});	
	
	it('Creates a handles bib which is an error', () => {		
		let record = lib.parseMARCFromXML(no_bib_response);
		expect(record).to.be.a("undefined");
	});
});