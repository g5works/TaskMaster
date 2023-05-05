const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: 'localhost',
    proxy: {
      '^/canvas': {
        target: 'pwcs.instructure.com/api/v1',
      }
    },
  },
  outputDir: 'src-tauri/target/webpack_dist'
})

