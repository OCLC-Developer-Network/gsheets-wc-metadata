const expect = require('chai').expect;
const fs = require('fs');
const gas = require('gas-local');
const sinon = require('sinon');
const mocks = require("./mocks/gas-mocks");

const lib = gas.require('./src', mocks);

exports.currentOCN_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/currentOCN_response.json')).toString();
exports.currentOCN_response_same = fs.readFileSync(require('path').resolve(__dirname, './mocks/currentOCN_response_same.json')).toString();

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
	describe('Make a request for current oclcNumber', () => {
		it('returns proper oclcNumber', () => {
		    sinon.stub(mocks.UrlFetchApp, 'fetch').returns({
	    	    getContentText: () => currentOCN_response,
	    	    getResponseCode: () => 200
	    	  });	    
			let currentOCN = lib.getCurrentOCLCNumber(318877925);
			expect(currentOCN).to.equal('311684437');
		});	
	});
	
	describe('Make a request for current oclcNumber same', () => {
		it('returns proper oclcNumber', () => {
		    sinon.stub(mocks.UrlFetchApp, 'fetch').returns({
	    	    getContentText: () => currentOCN_response_same,
	    	    getResponseCode: () => 200
	    	  });
		    let currentOCN = lib.getCurrentOCLCNumber(318877925);
			expect(currentOCN).to.equal('318877925');

		});
	});
});