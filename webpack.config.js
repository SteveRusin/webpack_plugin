const path = require('path');
const minifyCss = require('./myPlugin/myPlugin');

const config = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    context: path.resolve(__dirname),
    plugins: [new minifyCss({path: './src/target.css', output: './dist/minified.css'})]
};

module.exports = config;