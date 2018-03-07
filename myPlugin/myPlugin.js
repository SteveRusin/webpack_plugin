const fs = require('fs');
const util = require('util');


class CompileProperties {
    constructor(options) {
        this.options = options;
        this.properties;
    }

    apply(compiler) {
        compiler.plugin('compile', (params) => {
            fs.readFile(this.options.path, 'latin1', (err, data) => {
                this.properties = createObject(data);

                fs.writeFile(this.options.output, `export const props = ${util.inspect(this.properties)}`)
            });

        })
    }
}

function createObject(data) {
    const regex = /^(\b.+)\s*=\s*(.*)/gm;
    let match = regex.exec(data);
    const tempObj = {}
    while (match != null) {
        tempObj[replaceDot(match[1])] = match[2];
        match = regex.exec(data);
    }
    return tempObj;
}

function replaceDot(key) {
    return key.replace(/\.\w/g, symbol => symbol[1].toUpperCase())
}

module.exports = CompileProperties;