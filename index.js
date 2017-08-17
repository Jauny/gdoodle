#!/usr/bin/env node

var fs = require('fs');

var chalk = require('chalk');
var program = require('commander');

var folder;
program
  .arguments('[fldr]')
  .action(function(fldr) {
    folder = fldr;
  })
  .parse(process.argv);

if (!folder) {
  console.log(chalk.red('Please enter a doodle name.'));
  process.exit(1);
}

var dirPath = process.cwd() + '/' + folder;
try {
  fs.mkdirSync(dirPath);
} catch(err) {
  console.log(chalk.red(err));
  process.exit(1);
}

var jsPath = dirPath + '/script.js';
fs.createReadStream(__dirname + '/files/script.js')
  .on('error', function(err) {
    fs.unlinkSync(jsPath);
    fs.unlinkSync(htmlPath);
    fs.rmdirSync(dirPath);
    console.log(chalk.red(err));
    process.exit(1);
  })
  .pipe(fs.createWriteStream(jsPath));

var htmlPath = dirPath + '/index.html';
fs.createReadStream(__dirname + '/files/template.html')
  .on('error', function(err) {
    fs.unlinkSync(jsPath);
    fs.unlinkSync(htmlPath);
    fs.rmdirSync(dirPath);
    console.log(chalk.red(err));
    process.exit(1);
  })
  .on('close', function() {
    console.log(chalk.green('Created project in %s'), folder);
  })
  .pipe(fs.createWriteStream(htmlPath));
