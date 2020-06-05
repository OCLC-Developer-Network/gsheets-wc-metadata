const fs = require('fs');

exports.brief_response = fs.readFileSync(require('path').resolve(__dirname, './mocks/brief_bib_response.json')).toString();