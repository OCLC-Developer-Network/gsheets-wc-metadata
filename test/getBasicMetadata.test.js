const expect = require('chai').expect;
const fs = require('fs');
const gas = require('gas-local');
const sinon = require('sinon');
const mocks = require("./mocks/gas-mocks");

const lib = gas.require('./src', mocks);

brief_bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/brief_bib_response.json')).toString();
bib_noISBNs = fs.readFileSync(require('path').resolve(__dirname, './mocks/brief-bib-noISBNs.json')).toString();
bib_no_subfieldb_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/brief-bib-2.json')).toString();
bib_subfield_d_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/brief-bib-3.json')).toString();
no_bib_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/no_brief-bib.json')).toString();

describe('parse basic metadata tests', () => {
    before(() => {
	    sinon.stub(lib, 'getService').returns({
    		hasAccess: () => true,
    		getAccessToken: () => 'tk_123456'
    	});
      });
	afterEach(() => {
    	mocks.UrlFetchApp.fetch.restore();
      });
	after(() => {
    	lib.getService.restore();
      });
	
	describe('Make a request for a record', () => {
		it('Creates a proper object', () => {
		    sinon.stub(mocks.UrlFetchApp, 'fetch').returns({
	    	    getContentText: () => brief_bib_response,
	    	    getResponseCode: () => 200
	    	  });
			let bib = lib.getBasicMetadata(318877925);
			expect(bib).to.be.an("object");
			expect(bib.oclcNumber).to.equal("318877925");
			expect(bib.title).to.equal("Simon's cat");
			expect(bib.creator).to.equal("Simon. Tofield");
			expect(bib.mergedOCNs).to.be.an("array");
			expect(bib.mergedOCNs.join()).to.equal("877908501,979175514,981548811,990719089,993246604,1005002644,1011917725,1016539262,1020206933,1043441377,1057597575,1089599685,1145205644");
			
		});
	});	
	
	describe('Make a request for a record with no ISBNs', () => {
		it('Creates a handles bib with no ISBNs object', () => {
		    sinon.stub(mocks.UrlFetchApp, 'fetch').returns({
	    	    getContentText: () => bib_noISBNs,
	    	    getResponseCode: () => 200
	    	  });			
			let bib = lib.getBasicMetadata(1);
			expect(bib).to.be.an("object");
			expect(bib.oclcNumber).to.equal("1");
			expect(bib.title).to.equal("The Rand McNally book of favorite pastimes");
			expect(bib.creator).to.equal("Dorothy. Grider");
			expect(bib.mergedOCNs).to.be.an("array");
			expect(bib.mergedOCNs.join()).to.equal("6567842,9987701,53095235,433981287")
		});
	});
	
	describe('Make a request for a record with no 245 |b', () => {	
		it('Creates a handles bib no 245 |b', () => {
			sinon.stub(mocks.UrlFetchApp, 'fetch').returns({
	    	    getContentText: () => bib_no_subfieldb_response,
	    	    getResponseCode: () => 200
	    	  });
			let bib = lib.getBasicMetadata(1928);
			expect(bib).to.be.an("object");
			expect(bib.oclcNumber).to.equal("1928");
			expect(bib.title).to.equal("Crossings");
			expect(bib.creator).to.equal("Hua. Chuang");
			expect(bib.mergedOCNs).to.be.an("array");
			expect(bib.mergedOCNs.join()).to.equal("8450570")
		});
	});
	
	describe('Make a request for a record with 1xx with |d', () => {		
		it('Creates a handles bib 1xx with |d', () => {
			sinon.stub(mocks.UrlFetchApp, 'fetch').returns({
	    	    getContentText: () => bib_subfield_d_response,
	    	    getResponseCode: () => 200
	    	  });
			let bib = lib.getBasicMetadata(27972555);
			expect(bib).to.be.an("object");
			expect(bib.oclcNumber).to.equal("27972555");
			expect(bib.title).to.equal("Design, form, and chaos");
			expect(bib.creator).to.equal("Paul Rand");
			expect(bib.mergedOCNs).to.be.an("array");
			expect(bib.mergedOCNs.join()).to.equal("1008281567")
		});
	
	});
	
	describe('Make a request for a record with 1xx with |d', () => {	
		it('Creates a handles an error response object', () => {
			sinon.stub(mocks.UrlFetchApp, 'fetch').returns({
	    	    getContentText: () => no_bib_response,
	    	    getResponseCode: () => 200
	    	  });			
			//let bib = lib.getBasicMetadata(no_bib_response);
			//expect(bib).to.be.an("object");
		});
	});
	
});
