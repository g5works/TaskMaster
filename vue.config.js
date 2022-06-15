const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: 'localhost'
  },
  outputDir: 'src-tauri/target/webpack_dist'
})

