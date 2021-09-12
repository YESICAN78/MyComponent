const { createProxyMiddleware } = require("http-proxy-middleware");
const proxyConfig = require("../Proxy");
module.exports = function (app) {
  Object.keys(proxyConfig).forEach((path) => {
    const config = proxyConfig[path];
    app.use(createProxyMiddleware(path, config));
  });
};
 