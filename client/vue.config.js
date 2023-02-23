const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/kickoff/',
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/api': {
          target: 'https://kickoff-api.onrender.com',
        },
      },
    },
  },
})