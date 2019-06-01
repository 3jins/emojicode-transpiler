#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const et = require('../lib/index');

const extension = '🍇';
const params = process.argv.splice(2);
if (params.length === 0) {
  console.error('Give a file as a parameter');
} else {
  const param = params[0];
  const fileName = param.substring(0, param.lastIndexOf('.'));
  fs.readFile(path.resolve([fileName, extension].join('.')), (err, raw) => {
    if (err) console.error(err);
    // console.log(String(raw));
    const transfiled = et(String(raw));
    console.log(transfiled);
  });
}
