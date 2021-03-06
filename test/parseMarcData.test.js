const expect = require('chai').expect;
const fs = require('fs');

const lib =require('../lib/marc-lib');

bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/bib-marc.xml')).toString();
bib_noISBNs_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/bib-noISBNs-marc.xml')).toString();

describe('Handle parsing a MARC records', () => {
	it('Creates a proper object', () => {	    
		let bib = lib.parseMarcData(bib_response);
		expect(bib).to.be.an("object");
		expect(bib.oclcNumber).to.equal("ocn318877925");
		expect(bib.title).to.equal("Simon's cat");
		expect(bib.author).to.equal("Tofield, Simon");
		expect(bib.isbns).to.be.an("array");
		expect(bib.isbns.join()).to.equal("9780446560061,0446560065");
		expect(bib.mergedOCNs).to.be.an("array");
		expect(bib.mergedOCNs.join()).to.equal("877908501,979175514,981548811,990719089,993246604,1005002644,1011917725,1016539262,1020206933,1043441377,1057597575,1089599685,1145205644,1157113159");
	});	

	it('Creates a handles bib with no ISBNs object', () => {		
		let bib = lib.parseMarcData(bib_noISBNs_response);
		expect(bib).to.be.an("object");
		expect(bib.oclcNumber).to.equal("ocm00000001");
		expect(bib.title).to.equal("The Rand McNally book of favorite pastimes");
		expect(bib.author).to.equal("Grider, Dorothy");
		expect(bib.isbns).to.be.an("array");
		expect(bib.isbns.join()).to.equal("");
		expect(bib.mergedOCNs).to.be.an("array");
		expect(bib.mergedOCNs.join()).to.equal("6567842,9987701,53095235,433981287")
	});
});