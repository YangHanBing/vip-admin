module.exports = {
  devServer: {
    port: 8080,
    host: "localhost",
    https: false,
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_URL]: {
        target: process.env.VUE_APP_SERVICE_URL,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_URL]: ""
        }
      }
    }
  },
  // 解决打包过后首屏白屏的问题
  publicPath: './',
  // 打包时不会生成 .map 文件，加快打包速度
  productionSourceMap: false
}