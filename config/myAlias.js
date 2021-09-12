const allSites = require('../gulpTasks/config/sites').all;
const resolve = require('../resolve');
const alias = {
  framework: resolve('./src/framework'),
  components: resolve('./src/framework/components'),
  src: resolve('./src'),
};
allSites.forEach((siteItem) => {
  alias[siteItem] = resolve(`./src/sites/${siteItem}`);
});
console.log(alias)
module.exports = alias;
