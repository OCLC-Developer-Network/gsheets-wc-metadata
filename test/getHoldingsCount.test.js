const expect = require('chai').expect;
const fs = require('fs');
const gas = require('gas-local');
const sinon = require('sinon');
const mocks = require("./mocks/gas-mocks");

const lib = gas.require('./src', mocks);

holding_summary_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/holding_count_response.json')).toString();
holding_count_multiple_editions = fs.readFileSync(require('path').resolve(__dirname, './mocks/holding_count_multiple_editions.json')).toString();
no_holding_summary_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/holding_count_response_no_results.json')).toString();


describe('when getHoldingsCount request is stubbed', () => {
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
	describe('Make a request for a record with holdings', () => {
		it('returns proper holdings', () => {
		    sinon.stub(mocks.UrlFetchApp, 'fetch').returns({
	    	    getContentText: () => holding_count_multiple_editions,
	    	    getResponseCode: () => 200
	    	  });	    
			let totalHoldingCount = lib.getHoldingsCount(318877925, 'US');
			expect(totalHoldingCount).to.equal(1734);
		});	
	});
	
	describe('Make a request for a record with multiple edition holdings', () => {
		it('returns proper holdings', () => {
		    sinon.stub(mocks.UrlFetchApp, 'fetch').returns({
	    	    getContentText: () => holding_summary_response,
	    	    getResponseCode: () => 200
	    	  });	    
			let totalHoldingCount = lib.getHoldingsCount(318877925, 'US');
			expect(totalHoldingCount).to.equal(464);
		});	
	});
	
	describe('Make a request for a record with no holdings', () => {
		it('returns proper holdings', () => {
		    sinon.stub(mocks.UrlFetchApp, 'fetch').returns({
	    	    getContentText: () => no_holding_summary_response,
	    	    getResponseCode: () => 200
	    	  });
		    let totalHoldingCount = lib.getHoldingsCount(318877925, "US");
			expect(totalHoldingCount).to.equal(0);

		});
	});
});