      //set the variables
  var a = document.getElementById('canvas'),
      c = a.getContext('2d'),
      w = 200,//a.width = window.innerWidth,
      h = 300,//a.height = window.innerHeight,
      area = w * h,
      particleNum = 300,
      ANIMATION;

  var particles = [];


  //create the particles
  function Particle(i) {
    this.id = i;
    this.hue =  rand(50, 0, 1);
    this.active = false;
  }

  Particle.prototype.build = function() {
    this.x = w / 2;
    this.y = h / 2;
    this.r = rand(7, 2, 1);
    this.vx = Math.random() * 10 - 5;
    this.vy = Math.random() * 10 - 5;
    this.gravity = .01;
    this.opacity = Math.random() + .5;
    this.active = true;

    c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    c.fillStyle = "hsla(" + this.hue + ",100%,50%,1)";
    c.fill();
  };

  Particle.prototype.draw = function() {
    this.active = true;
    this.x += this.vx;
    this.y += this.vy;
    this.vy += this.gravity;
    this.hue -= 0.5;
    this.r = Math.abs(this.r - .05);

    c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    c.fillStyle = "hsla(" + this.hue + ",100%,50%,1)";
    c.fill();

    // reset particle
    if(this.r <= .05) {
      this.active = false;
    }
  };


  //functionality
  function drawScene() {
    c.fillStyle = "black";
    c.fillRect(0,0,w,h);

    for(var i = 0; i < particles.length; i++) {
      if(particles[i].active === true) {
        particles[i].draw();
      } else {
        particles[i].build();
      }
    }

        ANIMATION = requestAnimationFrame(drawScene);
  }

  function initCanvas() {
    var s = getComputedStyle(a);

    if(particles.length) {
      particles = [];
      cancelAnimationFrame(ANIMATION);
      ANIMATION;
      console.log(ANIMATION);
    }

    w = a.width = window.innerWidth;
    h = a.height = window.innerHeight;

    for(var i = 0; i < particleNum; i++) {
      particles.push(new Particle(i));
    }

    drawScene();
    console.log(ANIMATION);
  }


  //init
  (function() {
    initCanvas();
    addEventListener('resize', initCanvas, false);
  })();


  //helper functions
  function rand(max, min, _int) {
    var max = (max === 0 || max)?max:1, 
        min = min || 0, 
        gen = min + (max - min) * Math.random();

    return (_int) ? Math.round(gen) : gen;
  };