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
                fs.writeFile(this.options.output, `export const props = ${util.inspect(this.properties)}`, () => console.log('done write'))
            });

        })
    }
}

function createObject(data) {
    const regex = /^(\b.+)\s*=\s*(.*)/gm;
    let match = regex.exec(data);
    const tempObj = {}
    while (match != null) {
        tempObj[replaceDot(match[1])] = convertToBolAndNum(match[2]);
        match = regex.exec(data);
    }
    console.log(tempObj)
    return tempObj;
}

function convertToBolAndNum(string) {
    if (string === 'true' || string === 'false') {
        return string === 'true';
    } else if (/^\d*$/.test(string)) {
        return +string;
    }
    return string;
}

function transformToChar(obj) {
    const tempObj = {};
    Object.keys(obj).forEach(key => {
        tempObj[decodeString(key)] = decodeString(obj[key]);
    })
    return tempObj;
}

function replaceDot(key) {
    return key.replace(/\.\w/g, symbol => symbol[1].toUpperCase())
}

module.exports = CompileProperties;