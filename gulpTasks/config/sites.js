const fs = require('fs');
const resolve = require('../../resolve');
const sitesDir = resolve('./src/sites');
const sites = fs.readdirSync(sitesDir);

module.exports = {
  all: sites,
};
