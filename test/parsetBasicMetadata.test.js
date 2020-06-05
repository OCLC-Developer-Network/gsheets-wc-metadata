const expect = require('chai').expect;
const fs = require('fs');

var gas = require('gas-local');

const lib = gas.require('./src');

brief_bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/brief_bib_response.json')).toString();

describe('parse bib json tests', () => {
	it('Creates a proper object', () => {
		let bib = lib.parseBasicMetadata(brief_bib_response);
		expect(bib).to.be.an("object");
		expect(bib.oclcNumber).to.equal("318877925");
		expect(bib.title).to.equal("Simon's cat");
		expect(bib.creator).to.equal("Simon. Tofield");
		expect(bib.date).to.equal("2009");
		expect(bib.language).to.equal("eng");
		expect(bib.generalFormat).to.equal("Book");
		expect(bib.specificFormat).to.equal("PrintBook");
		expect(bib.edition).to.equal("1st ed.");
		expect(bib.publisher).to.equal("Grand Central Pub.");
		expect(bib.catalogingAgency).to.equal("DLC")
		expect(bib.mergedOCNs).to.be.an("array");
		expect(bib.mergedOCNs.join()).to.equal("877908501,979175514,981548811,990719089,993246604,1005002644,1011917725,1016539262,1020206933,1043441377,1057597575,1089599685,1145205644");
	});
});
