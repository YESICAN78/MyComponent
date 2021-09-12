function createInterfaceProxy(ip = "localhost", port = "9090") {
  return {
    target: `http://${ip}:${port}/`,
    changeOrigin: true,
    cookieDomainRewrite: {
      "*": "localhost", // 把相应的 cookie 域都设置成 localhost，或者指定的域名
    },
    pathRewrite: {
      "^/sunapiInterface/sunapi": "/",
    },
  };
}
// 网关
const interfaceConfig = { 
  "/sunapiInterface/sunapi": createInterfaceProxy(),
};
module.exports = interfaceConfig;
