// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//dding the following constructor to the bottom of our code.

function Shape() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.velX = random(-7, 7);
  this.velY = random(-7, 7);
  this.exists = true;
}

function Ball() {
  Shape.call(this);
  this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
  this.size = random(10, 20);
}

function EvilCircle() {

	Shape.call(this);
	this.color = 'white';
	this.size = 10;
	this.velX = 20;
	this.velY = 20;

	this.draw = function(){ 
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();		
	};

	this.checkBounds = function() {
	if ((this.x + this.size) >= width) {
    this.velX = - this.size;
  }

  if ((this.x - this.size) <= 0) {
    this.velX = - this.size ;
  }

  if ((this.y + this.size) >= height) {
    this.velY = - this.size;
  }

  if ((this.y - this.size) <= 0) {
    this.velY = - this.size;
  }
	};

	this.setControls = function() {
	var _this = this;
	window.onkeydown = function(e) {
    if (e.keyCode === 65) {
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }
  }
	};

	this.collisionDetect = function() {
		for (j = 0; j < balls.length; j++) {
    if ((balls[j].exists)) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
      }
    }
  }
	};
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}

Ball.prototype.collisionDetect = function() {
  for (j = 0; j < balls.length; j++) {
    if ( (!(this.x === balls[j].x && this.y === balls[j].y && this.velX === balls[j].velX && this.velY === balls[j].velY)) ) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
}

var balls = [];

var evil = new EvilCircle();
evil.setControls();
function loop() {
	ctx.fillStyle = 'rgba(0,0,0,0.25)';
	ctx.fillRect(0,0,width,height);
	evil.draw();
	evil.checkBounds();
	evil.collisionDetect();
	while (balls.length < 25) {
		var ball = new Ball();
		balls.push(ball);
	}

	for(i = 0;i < balls.length ; i++) {
		if(balls[i].exists) {
		balls[i].draw();
		balls[i].update();
		balls[i].collisionDetect();
	}
	}
	requestAnimationFrame(loop);
}

loop();