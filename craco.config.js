const path = require('path')
module.exports = {
  webpack: {
    entry: './path/to/my/entry/file.js',
    alias: {
      bootflex: path.resolve(__dirname, 'src/library'),
    },
  },
}
