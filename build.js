#!/usr/bin/env node

var fs = require('fs');

var html = "\
<canvas id='canvas' width='500' height='500'></canvas>\n\
<script src='index.js' type='text/javascript'></script>\n";

var js = "\
var canvas = document.getElementById('canvas');\n\
var ctx = canvas.getContext('2d');\n\
ctx.fillStyle = 'black';\n\
ctx.fillRect(0, 0, canvas.width, canvas.height);"

fs.writeFile('./index.html', html, err => {
  if (err) {
    return console.log(err);
  }

  console.log('sucess');
});

fs.writeFile('./index.js', js, err => {
  if (err) {
    return console.log(err);
  }

  console.log('sucess');
});
