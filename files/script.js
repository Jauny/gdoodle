/*
 * Thing is a the basic drawable entity on the canvas
 */
var Thing = function(x, y, canvas, ctx) {
  this.canvas = canvas;
  this.ctx = ctx;

  // position on cavas
  this.x = x;
  this.y = y;

  // velocity, movement
  this.vx = 0.5;
  this.vy = 0.5;

  this.size = 5;

  // update cycle called every draw loop
  this.update = function() {
    this.x += this.vx;
    this.y += this.vy;

    // when get to edge, reappear at opposite edge
    if (this.x < 0) {
      this.x = this.canvas.width;
    } else if (this.x > this.canvas.width) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = this.canvas.width;
    } else if (this.y > this.canvas.width) {
      this.y = 0;
    }
  };

  this.render = function() {
    this.ctx.fillStyle = 'orange';
    // "- this.size / 2" draws at the center of Thing, instead of start at top left
    this.ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  };
};

/*
 * Some basic helper functions
 */
// getMousePos returns {x, y} position of mouse cursor
var getMousePos = function(evt, canvas) {
  var rect = canvas.getBoundingClientRect();
  return {
    y: evt.clientY - rect.top,
    x: evt.clientX - rect.left
  };
};

var handleMouseClick = function(evt, canvas) {
  var mousePos = getMousePos(evt, canvas);
  console.log('mouseX: %s, mouseY: %s', mousePos.x, mousePos.y);
};

/*
 * Rendering base.
 *
 * draw draws the canvas and its elements
 *
 * setup is a one time call to select the canvas DOM element
 * and start a loop 30 times / second.
 */
var draw = function(canvas, ctx, things) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < things.length; i++) {
    things[i].update();
    things[i].render();
  }
};

var setup = function() {
  // get canvas from DOM
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // generate some Things
  var things = [];
  for (var i = 0; i < 10; i++) {
    things.push(new Thing(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      canvas,
      ctx)
    );
  }

  // setup the rendering loop
  window.setInterval(function() {
    draw(canvas, ctx, things);
  }, 1000/60);

  // listener for mouse click
  canvas.addEventListener('click', function(evt) {
    handleMouseClick(evt, canvas);
  });
};

setup();

/*
 * Cheat sheet
 *
 * Setup Colors
 * ------------
 * ctx.fillStyle = css color | gradient | pattern
 * ctx.strokeStyle = css color | gradient | pattern
 *
 * Setup Shapes
 * ------------
 * ctx.rect(x, y, width, height)          // can use ctx.fillRect to directly fill a rect
 * ctx.arc(x, y, r, startAngle, endAngle) // 0, Math.PI*2 for full circle
 *
 * Setup text
 * ----------
 * ctx.font = '30px Arial'
 * ctx.testAlign = 'center'
 * ctx.fillText('text', x, y)
 * ctx.strokeText('text', x, y)
 *
 * Draw
 * ----
 * ctx.beginPath()
 * ctx.moveTo(x, y) // move cursor without drawing
 * ctx.lineTo(x, y) // declare a line to
 * ctx.stroke()     // actually draw lines previously declared
 * ctx.fill()       // fill what was previously declared
 *
 */

