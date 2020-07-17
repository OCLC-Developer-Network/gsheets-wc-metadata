const xpath = require('xpath')
const dom = require('xmldom').DOMParser

function parseMARCFromXML(responseXML){
	var result = new dom().parseFromString(responseXML);
	
	var select = xpath.useNamespaces({
		  "atom": "http://www.w3.org/2005/Atom",
		  "rb": "http://worldcat.org/rb",
		  "marc": "http://www.loc.gov/MARC21/slim"
		});
	
    var content = select("//atom:content/rb:response")[0]
    var xml = content.serializeToString();
    return xml
}

function parseMarcData(record){
	
	var doc = new dom().parseFromString(record)
	var select = xpath.useNamespaces({"marc": "http://www.loc.gov/MARC21/slim"});
    
    let oclcNumber = select("//marc:controlfield[@tag='001']", doc)[0].firstChild.data
	    
	let title = select("//marc:datafield[starts-with(@tag, '24')]/marc:subfield[@code='a']", doc)[0].firstChild.data
	title = title.replace(/\s\/+$/, "")
	    
	let author = select("//marc:datafield[@tag='100'or @tag='110'or @tag='700' or @tag='710']/marc:subfield[@code='a']", doc)[0].firstChild.data  
	author = author.replace(/\.+$/, "")
	
	let isbnListNodes = select("//marc:datafield[@tag='020']/marc:subfield[@code='a']", doc)	

	let isbnList = [];
	if (isbnListNodes.length > 0) {
		for(var node of isbnListNodes.values()) { 
			isbnList.push(node.firstChild.data); 
		}
	}
	
	let mergedOCNNodes = select("//marc:datafield[@tag='019']/marc:subfield[@code='a']", doc)
	let mergedOCNList = [];
	if (mergedOCNNodes.length > 0) {
		for(var node of mergedOCNNodes.values()) { 
			mergedOCNList.push(node.firstChild.data); 
		}
	}
	    
	let bib = new Object(); 
	bib.oclcNumber = oclcNumber
	bib.title =  title
	bib.author = author
	bib.isbns = isbnList
	bib.mergedOCNs = mergedOCNList
	return bib;
}

module.exports = {parseMARCFromXML, parseMarcData};