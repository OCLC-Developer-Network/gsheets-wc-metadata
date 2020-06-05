const expect = require('chai').expect;
const fs = require('fs');

var gas = require('gas-local');

const lib = gas.require('./src');

describe('create bib resource URL tests', () => {
	it('Creates a bib read url', () => {
		let url = lib.createRequestURL('getMetadata', "1");
		expect(url).to.equal("https://worldcat.org/bib/data/1");
	});
	
});

describe('create brief-bib resource URL tests', () => {
	it('Creates a bib read url', () => {
		let url = lib.createRequestURL('getBasicMetadata', "1");
		expect(url).to.equal("https://americas.metadata.api.oclc.org/worldcat/search/v1/brief-bibs/1");
	});
	
});

describe('create get current OCLC number URL tests', () => {	
	it('Creates url filter by OCLC Number + heldBy ', () => {
		let url = lib.createRequestURL('getCurrentOCLCNumber', "27972555");
		expect(url).to.equal("https://worldcat.org//bib/checkcontrolnumbers?oclcNumbers=27972555");
	});
	
});

describe('create check holdings URL tests', () => {	
	it('Creates url with a single OCLC Number', () => {
		let url = lib.createRequestURL('getHoldingStatus', "27972555");
		expect(url).to.equal("https://worldcat.org/ih/checkholdings?oclcNumber=27972555");
	});
	
});

describe('create bib-summary-holdings URL tests', () => {
	it('Creates url filter by country - getHoldingsCount', () => {
		let url = lib.createRequestURL('getHoldingsCount', '1696940', 'heldInCountry', 'US');
		expect(url).to.equal("https://americas.metadata.api.oclc.org/worldcat/search/v1/bibs-summary-holdings?oclcNumber=1696940&heldInCountry=US");
	});

});

describe('create bib-retained-holdings URL tests', () => {
	it('Creates url filter by state - checkRetentions', () => {
		let url = lib.createRequestURL('checkRetentions', '1696940', 'heldInState', 'IL')
		expect(url).to.equal("https://americas.metadata.api.oclc.org/worldcat/search/v1/bibs-retained-holdings?oclcNumber=1696940&heldInState=IL");
	});
	
	it('Creates url filter by group - checkRetentions', () => {
		let url = lib.createRequestURL('checkRetentions', '27972555', 'heldByGroup', 'EAST')
		expect(url).to.equal("https://americas.metadata.api.oclc.org/worldcat/search/v1/bibs-retained-holdings?oclcNumber=27972555&heldByGroup=EAST");
	});
	
	it('Creates url filter by state - getRetentions', () => {
		let url = lib.createRequestURL('getRetentions', '1696940', 'heldInState', 'IL')
		expect(url).to.equal("https://americas.metadata.api.oclc.org/worldcat/search/v1/bibs-retained-holdings?oclcNumber=1696940&heldInState=IL");
	});
	
	it('Creates url filter by group - getRetentions', () => {
		let url = lib.createRequestURL('getRetentions', '27972555', 'heldByGroup', 'EAST')
		expect(url).to.equal("https://americas.metadata.api.oclc.org/worldcat/search/v1/bibs-retained-holdings?oclcNumber=27972555&heldByGroup=EAST");
	});
});
