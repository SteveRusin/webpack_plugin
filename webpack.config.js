const path = require('path');
const CompileProperties = require('./myPlugin/myPlugin');

const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    context: path.resolve(__dirname),
    plugins: [new CompileProperties({path: './src/local.properties', output: './dist/properties.js'})]
};

module.exports = config;