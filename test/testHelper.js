const fs = require('fs');

exports.marc_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/marcResponse.xml')).toString();
exports.brief_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/brief-bib.json')).toString();