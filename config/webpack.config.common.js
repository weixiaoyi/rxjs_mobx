const path = require('path')
module.exports = {
  alias: {
    '@routes': path.resolve(__dirname, '../src/routes'),
    '@models': path.resolve(__dirname, '../src/models'),
    '@services': path.resolve(__dirname, '../src/services'),
    '@components': path.resolve(__dirname, '../src/components'),
    '@utils': path.resolve(__dirname, '../src/utils'),
    '@assets': path.resolve(__dirname, '../src/assets'),
    '@constants': path.resolve(__dirname, '../src/constants'),
    '@common': path.resolve(__dirname, '../src/common'),
    '@mock': path.resolve(__dirname, '../src/mock'),
    '@styles': path.resolve(__dirname, '../src/styles')
  }
}