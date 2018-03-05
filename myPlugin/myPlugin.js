const fs = require('fs');

function apply(options, compiler) {
    let minified;
    compiler.plugin('compilation', function (compilation, params) {
        fs.readFile(options.path, 'utf8', function(err, file){
            minified = file.replace(/\s*/g, '');
        })
    });

    compiler.plugin('emit', function(compilation, callback){
        fs.writeFile(options.output, minified)
        callback();
    })
}

function minifyCss(options) {
    return {
        apply: apply.bind(this, options)
    };
};


module.exports = minifyCss;