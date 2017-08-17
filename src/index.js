#!/usr/bin/env node

import fs from 'fs';

import chalk from 'chalk';
import program from 'commander';

let folder;
program
  .arguments('[fldr]')
  .action(fldr => {
    folder = fldr;
  })
  .parse(process.argv);

if (!folder) {
  console.log(chalk.red('Please enter a doodle name.'));
  process.exit(1);
}

const dirPath = `${process.cwd()}/${folder}`;
try {
  fs.mkdirSync(dirPath);
} catch(err) {
  console.log(chalk.red(err));
  process.exit(1);
}

const jsPath = `${dirPath}/script.js`;
fs.createReadStream(`${__dirname}/files/script.js`)
  .on('error', err => {
    fs.unlinkSync(jsPath);
    fs.unlinkSync(htmlPath);
    fs.rmdirSync(dirPath);
    console.log(chalk.red(err));
    process.exit(1);
  })
  .pipe(fs.createWriteStream(jsPath));

const htmlPath = `${dirPath}/index.html`;
fs.createReadStream(`${__dirname}/../static/template.html`)
  .on('error', err => {
    fs.unlinkSync(jsPath);
    fs.unlinkSync(htmlPath);
    fs.rmdirSync(dirPath);
    console.log(chalk.red(err));
    process.exit(1);
  })
  .on('close', () => {
    console.log(chalk.green('Created project in %s'), folder);
  })
  .pipe(fs.createWriteStream(htmlPath));
