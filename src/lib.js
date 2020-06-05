const xpath = require('xpath')
const dom = require('xmldom').DOMParser

function createRequestURL(functionName, oclcNumber, filterType, filterValue) {
	const baseURL = 'https://worldcat.org'
	const metadataBaseURL = 'https://americas.metadata.api.oclc.org/worldcat/search/v1'

	if (functionName == 'getCurrentOCLCNumber'){
		url = baseURL + '/bib/checkcontrolnumbers?oclcNumbers=' + oclcNumber; 
	} else if (functionName == 'getHoldingStatus'){
		url = baseURL + '/ih/checkholdings?oclcNumber=' + oclcNumber; 
	} else if (functionName == 'getMetadata'){
		url = baseURL + '/bib' + oclcNumber;
	} else if (functionName == 'getHoldingsCount'){
		url = metadataBaseURL + '/bibs-summary-holdings?oclcNumber=' + oclcNumber + '&' + filterType + '=' + filterValue;
	} else if (functionName == 'checkRetentions' || functionName == 'getRetentions'){
		url = metadataBaseURL + '/bibs-retained-holdings?oclcNumber=' + oclcNumber + '&' + filterType + '=' + filterValue;		
	} else {
		url = metadataBaseURL + '/brief-bibs/' + oclcNumber
	}

	return url
}

// rewrite to use standard library
function parseMARCFromXML(responseXML){    
    var doc = new dom().parseFromString(responseXML)
	var select = xpath.useNamespaces({"atom": "http://www.w3.org/2005/Atom", "rb": "http://worldcat.org/rb"});
    var marc = select("//atom:content/rb:response]", doc)[0].firstChild.data
    return marc
}


function parseMarcData(record){
	
	var doc = new dom().parseFromString(record)
	var select = xpath.useNamespaces({"marc": "http://www.loc.gov/MARC21/slim"});
    
    let oclcNumber = select("//marc:controlfield[@tag='001']", doc)[0].firstChild.data
	    
	let title = select("//marc:datafield[starts-with(@tag, '24')]/marc:subfield[@code='a']", doc)[0].firstChild.data
	    
	let author = select("//marc:datafield[@tag='100'or @tag='110'or @tag='700' or @tag='710']/marc:subfield[@code='a']", doc)[0].firstChild.data  
	
	//let isbnListNodes = select("//marc:datafield[@tag='020']/marc:subfield[@tag='a']", doc)
	
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
	
	let bib = new Object(); 
	bib.oclcNumber = record.oclcNumber
	bib.title =  record.title
	bib.creator = record.creator
	bib.date = record.date
	bib.language = record.language
	bib.generalFormat = record.generalFormat
	bib.specificFormat = record.specificFormat
	bib.edition = record.edition
	bib.publisher = bib.publisher
	bib.catalogingAgency = bib.catalogingInfo.catalogingAgency
	bib.mergedOCNs = mergedOclcNumbers		    		

    return bib
}