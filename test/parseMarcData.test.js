const expect = require('chai').expect;
const fs = require('fs');
const gas = require('gas-local');
const mocks = require("./mocks/gas-mocks");

const lib = gas.require('./src', mocks);

bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/bib.xml')).toString();
bib_noISBNs_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/bib-noISBNs.xml')).toString();
no_bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/no_bib.xml')).toString();

describe.skip('Handle parsing a MARC records', () => {
	it('Creates a proper object', () => {	    
		let bib = lib.parseMarcData(bib_response);
		expect(bib).to.be.an("object");
		expect(bib.oclcNumber).to.equal("318877925");
		expect(bib.title).to.equal("Simon's cat");
		expect(bib.author).to.equal("Tofield, Simon");
		expect(bib.isbns).to.be.an("array");
		expect(bib.isbns.join()).to.equal("9780446560061,0446560065");
		expect(bib.mergedOCNs).to.be.an("array");
		expect(bib.mergedOCNs.join()).to.equal("877908501,979175514,981548811,990719089,993246604,1005002644,1011917725,1016539262,1020206933,1043441377,1057597575,1089599685,1145205644");
	});	

	it('Creates a handles bib with no ISBNs object', () => {		
		let bib = lib.parseMarcData(bib_noISBNs_response);
		expect(bib).to.be.an("object");
		expect(bib.oclcNumber).to.equal("1");
		expect(bib.title).to.equal("The Rand McNally book of favorite pastimes");
		expect(bib.author).to.equal("Grider, Dorothy");
		expect(bib.isbns).to.be.an("array");
		expect(bib.isbns.join()).to.equal("");
		expect(bib.mergedOCNs).to.be.an("array");
		expect(bib.mergedOCNs.join()).to.equal("6567842,9987701,53095235,433981287")
	});
	
	it('Creates a handles bib which is an error', () => {		
		let bib = lib.parseMarcData(no_bib_response);
		expect(bib).to.be.an("object");
	});
});