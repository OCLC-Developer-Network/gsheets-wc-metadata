function createRequestURL(functionName, oclcNumber, filterType, filterValue) {
	const baseURL = 'https://worldcat.org'
	const metadataBaseURL = 'https://americas.metadata.api.oclc.org/worldcat/search/v1'

	if (functionName == 'getCurrentOCLCNumber'){
		url = baseURL + '/bib/checkcontrolnumbers?oclcNumbers=' + oclcNumber; 
	} else if (functionName == 'getHoldingStatus'){
		url = baseURL + '/ih/checkholdings?oclcNumber=' + oclcNumber; 
	} else if (functionName == 'getMetadata'){
		url = baseURL + '/bib/data/' + oclcNumber;
	} else if (functionName == 'getHoldingsCount'){
		url = metadataBaseURL + '/bibs-summary-holdings?oclcNumber=' + oclcNumber + '&' + filterType + '=' + filterValue;
	} else if (functionName == 'checkRetentions' || functionName == 'getRetentions'){
		url = metadataBaseURL + '/bibs-retained-holdings?oclcNumber=' + oclcNumber + '&' + filterType + '=' + filterValue;		
	} else {
		url = metadataBaseURL + '/brief-bibs/' + oclcNumber
	}

	return url
}

function nsResolver(prefix) {
	  var ns = {
			  "atom": "http://www.w3.org/2005/Atom",
			  "rb": "http://worldcat.org/rb",
			  "marc": "http://www.loc.gov/MARC21/slim"
			};
	  return ns[prefix] || null;
}

function parseMARCFromXML(responseXML){
	var result = new DOMParser().parseFromString(responseXML, "application/xml");
	
    var entries = result.documentElement.getElementsByTagNameNS(nsResolver('atom'), 'content');
    var content = entries[0].getElementsByTagNameNS(nsResolver('rb'),'response').getElementsByTagNameNS(nsResolver('marc'),'record');
    var xml = content.serializeToString();
    return xml
}

function parseMarcData(data){
	var doc = new DOMParser().parseFromString(record, "application/xml");
	
	let oclcNumber = doc.evaluate("//marc:controlfield[@tag='001']", doc, nsResolver, XPathResult.ANY_TYPE, null)[0].firstChild.data;
   
	    
	let title = doc.evaluate("//marc:datafield[starts-with(@tag, '24')]/marc:subfield[@code='a']", doc, nsResolver, XPathResult.ANY_TYPE, null)[0].firstChild.data
	    
	let author = doc.evaluate("//marc:datafield[@tag='100'or @tag='110'or @tag='700' or @tag='710']/marc:subfield[@code='a']", doc, nsResolver, XPathResult.ANY_TYPE, null)[0].firstChild.data  
	
	//let isbnListNodes = doc.evaluate("//marc:datafield[@tag='020']/marc:subfield[@tag='a']", doc, nsResolver, XPathResult.ANY_TYPE, null)
	
	//let isbnList = [];
	//while(node = isbnListNodes.iterateNext()) {
	//	isbnList.push(node.firstChild.data);
	//}
	    
	let bib = new Object(); 
	bib.oclcNumber = oclcNumber
	bib.title =  title
	bib.author = author
	//bib.isbns = isbnList.join(', ')
	return bib;
}

function parseBasicMetadata(result) {
	let record = JSON.parse(result);	
	
	let title = record.title
	// remove trailing space slash
	title = title.replace(/\s\/.*$/, "")
	// remove trailing period
	title = title.replace(/\.$/, "");
	
	let bib = new Object(); 
	bib.oclcNumber = record.oclcNumber
	bib.title =  title
	bib.creator = record.creator
	bib.date = record.date
	bib.language = record.language
	bib.generalFormat = record.generalFormat
	bib.specificFormat = record.specificFormat
	bib.edition = record.edition
	bib.publisher = record.publisher
	bib.catalogingAgency = record.catalogingInfo.catalogingAgency
	bib.mergedOCNs = record.mergedOclcNumbers		    		

    return bib
}

function parseCurrentOCLCNumber(result){
	let currentOCN_results = JSON.parse(result);
	let current_OCLCNumber = currentOCN_results.entry[0].currentOclcNumber;
	return current_OCLCNumber
}

function parseHoldingStatus(result){
	let status_results = JSON.parse(result);
	let holdingStatus = ""
    if (status_results.isHoldingSet == true) {
    	holdingStatus = "TRUE"
    } else {
    	holdingStatus = "FALSE"
    }
	return holdingStatus
}

function parseHoldingsCount(result){
	let holding_count_results = JSON.parse(result);

	let holding_count = "";
	if (holding_count_results.numberOfRecords > 1) {
		let recordNodes = holding_count_results.briefRecords;
		let holdingCounts = recordNodes.map(record => record.institutionHolding.totalHoldingCount);
		holding_count = holdingCounts.reduce((a,b) => a + b, 0)
		
	} else {
		holding_count = holding_count_results.briefRecords[0].institutionHolding.totalHoldingCount;
	}
	
	return holding_count;
}

function parseRetentionsData(result) {
	let bibRetainedHoldings = JSON.parse(result);
	
	let numberOfRetentions = 0
	let oclcSymbolsRetentions = []
	
    if (bibRetainedHoldings.numberOfRecords == 0 || bibRetainedHoldings.briefRecords[0].institutionHolding.briefHoldings == undefined){
    	numberOfRetentions = 0
    	oclcSymbolRetentions = []
    } else {  
		let retentionSet = bibRetainedHoldings.briefRecords[0].institutionHolding.briefHoldings
		oclcSymbolRetentions = retentionSet.map(retention => retention.oclcSymbol)
		numberOfRetentions = retentionSet.length
    }
	
	let retentionData = new Object();
	retentionData.numberOfRetentions = numberOfRetentions
	retentionData.oclcSymbolRetentions = oclcSymbolRetentions		    		

    return retentionData;
}