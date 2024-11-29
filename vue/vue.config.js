const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const path = require('path');

module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
    }
  },
  configureWebpack: {
    plugins: [],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        additionalData: `@import '@/less/const.less';`
      }
    }
  },
  devServer: {
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    client: {
      overlay: false,
      webSocketURL: {
        protocol: 'wss',
        hostname: process.env.VUE_APP_WEBSITE_URL,
        port: 443,
        pathname: '/ws',
      }
    },
    hot: true,
  }
})
