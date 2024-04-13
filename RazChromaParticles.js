
//dataBuffer array full of 0's
var dataBuffer = new Array(6);
for (let r = 0; r < 6; r++) {
    dataBuffer[r] = new Array(22).fill(0);
}

const AMOUNT_OF_BALL_PARTICLES = 4;
const AMOUNT_OF_FOUNTAIN_PARTICLES = 5;
const AMOUNT_OF_COMET_PARTICLES = 6; //MAX OF 6
const AMOUNT_OF_EXPLOSION_PARTICLES = 20;
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0x00ffff, 0xffffff, 0xffff00];
let colorIndex = 0;

let ballParticlesRunning = false;
let fountainParticlesRunning = false;
let cometParticlesRunning = false;
let explosionParticlesRunning = false;
let randomExplosionParticlesRunning = false;

let ballParticleTimer;
let fountainParticleTimer;
let cometParticleTimer;
let explosionParticleTimer;
let randomExplosionParticleTimer;

let ballParticles = [];
let fountainParticles = [];
let cometParticles = [];
let explosionParticles = [];
let explosionParticles2 = [];
let randomExplosionParticles = [];
let randomExplosionParticles2 = [];
let randomColor = colors[Math.floor(Math.random()*colors.length)];
let randomColor2 = RGBtoHEXColor(Math.floor(getRed(randomColor)*.25), Math.floor(getGreen(randomColor)*.25), Math.floor(getBlue(randomColor)*.25));

        
function RGBtoHEXColor(red, green, blue) {
  return (red & 0xFF) | ((green & 0xFF) << 8) | ((blue & 0xFF) << 16);
}  
function getRed(color) {
  var red = (color & 0xFF);
  return red;
}
function getGreen(color) {
  var green = (color & 0xFF00) >> 8;
  return green;
}
function getBlue(color) {
  var blue = (color & 0xFF0000) >> 16;
  return blue;
}

function dimColorByAmount(color,amount){
  var rgb = { r:getRed(color), g:getGreen(color), b:getBlue(color) };
  rgb.r = Math.max(0, (rgb.r-amount) );
  rgb.g = Math.max(0, (rgb.g-amount) );
  rgb.b = Math.max(0, (rgb.b-amount) );
  return RGBtoHEXColor(rgb.r,rgb.g,rgb.b);
}

class Particle{
  constructor(x,y,vx,vy,color,gravity,bounce,fadeAmount){
      this.xPosInitial = x;
      this.yPosInitial = y;
      this.xVelInitial = vx;
      this.yVelInitial = vy;
      this.colorInitial = color;
      
      this.xPos = x;
      this.yPos = y;
      this.xVel = vx
      this.yVel = vy
      this.color = color;
      this.gravity = gravity;
      this.bounce = bounce;
      this.fadeAmount = fadeAmount;
  }
  reset(){
      this.xPos = this.xPosInitial;
      this.yPos = this.yPosInitial;
      this.xVel = -0.5 + Math.random() * 1;
      this.yVel = -0.1 + Math.random() * -1;
      this.color = this.colorInitial;
  }
  update(){
      this.xPos += this.xVel;
      this.yPos += this.yVel;
      this.yVel += this.gravity;
      
      if(this.xPos > 21){
          if(this.bounce){
              this.xVel *= -1;
              this.xPos = 20;
          }else{
              this.reset();
          }

      }
      if(this.xPos < 0){
          if(this.bounce){
              this.xVel *= -1;
              this.xPos = 1;
          }else{
              this.reset();
          }
      }
      if(this.yPos > 5){
          if(this.bounce){
              this.yVel *= -1;
              this.yPos = 4;
          }else{
              this.reset();
          }
      }
      if(this.yPos < 0){
          if(this.bounce){
              this.yVel *= -1;
              this.yPos = 1;
          }else{
              //this.reset();
          }
      }

      if(this.fadeAmount > 0){
          if(this.color > 0)
              this.color = dimColorByAmount(this.color,this.fadeAmount);
      }
  }
}

class ExplosionParticle extends Particle{
  constructor(x,y,color){
      super(x,y,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          color,
          0,
          false,
          20);

      this.done = false;
  }
  reset(){
      super.reset();
      this.done = false;
      this.xVel = -1 + Math.random() * 2;
      this.yVel = -1 + Math.random() * 2;
  }
  update(){
      if(this.done)
          return;

      this.xPos += this.xVel;
      this.yPos += this.yVel;
      this.yVel += this.gravity;
      
      if(this.xPos > 21){
          if(this.bounce){
              this.xVel *= -1;
              this.xPos = 20;
          }else{
              this.xPos = 20;
              this.color = 0;
              this.done = true;
          }

      }
      if(this.xPos < 0){
          if(this.bounce){
              this.xVel *= -1;
              this.xPos = 1;
          }else{
              this.xPos = 1;
              this.done = true;
              this.color = 0;
          }
      }
      if(this.yPos > 5){
          if(this.bounce){
              this.yVel *= -1;
              this.yPos = 4;
          }else{
              this.yPos = 4;
              this.done = true;
              this.color = 0;
          }
      }
      if(this.yPos < 0){
          if(this.bounce){
              this.yVel *= -1;
              this.yPos = 1;
          }else{
              this.yPos = 1;
              this.done = true;
              this.color = 0;
          }
      }

      if(this.fadeAmount > 0){
          if(this.color > 0)
              this.color = dimColorByAmount(this.color,this.fadeAmount);
          else
              this.done = true;
      }
  }
}

class ExplosionParticleAftermath extends ExplosionParticle{
  constructor(x,y,color){
      super(x,y,color);
      this.xVel = -.25 + Math.random() * .5;
      this.yVel = -.25 + Math.random() * .5;
      this.fadeAmount = 5;
      this.delay = 1;
  }
  update(){
      if(this.delay < 0)
          super.update();
      else
          this.delay--;
  }
  reset(){
      super.reset();
      this.xVel = -.25 + Math.random() * .5;
      this.yVel = -.25 + Math.random() * .5;
      this.delay = 1;
  }
}

class RandomExplosionParticle extends ExplosionParticle{
}

class RandomExplosionParticleAftermath extends ExplosionParticleAftermath{
}

//Initialize Explosion Particles
for(let i=0; i< AMOUNT_OF_EXPLOSION_PARTICLES; i++){
    explosionParticles.push( new ExplosionParticle(7, 3, RGBtoHEXColor(255,250,50)) );
    explosionParticles2.push( new ExplosionParticleAftermath(7, 3, RGBtoHEXColor(100,0,0),) );
    explosionParticles2.push( new ExplosionParticleAftermath(7, 3, RGBtoHEXColor(100,0,0),) );

    randomExplosionParticles.push( new RandomExplosionParticle(7, 3, randomColor) );
    randomExplosionParticles2.push( new RandomExplosionParticleAftermath(7, 3, randomColor2) );
    randomExplosionParticles2.push( new RandomExplosionParticleAftermath(7, 3, randomColor2) );
}

//Initialize Fountain Particles
for(let i=0; i<AMOUNT_OF_FOUNTAIN_PARTICLES; i++){
    fountainParticles.push( new Particle(7, 
                                5,
                                -0.5 + Math.random() * 1,
                                -0.1 + Math.random() * -1,
                                colors[colorIndex],
                                0.1,
                                false,
                                10   
                            ) );
    colorIndex++;
    if(colorIndex > colors.length-1)
        colorIndex = 0;
}

//Initialize Ball Particles
colorIndex = 0;
for(let i=0; i<AMOUNT_OF_BALL_PARTICLES; i++){
ballParticles.push( new Particle(Math.floor(Math.random() * 21), 
                                Math.floor(Math.random() * 5),
                                -1 + Math.random() * 2,
                                -1 + Math.random() * 2,
                                colors[colorIndex],
                                0.0,
                                true,
                                0    
                            ) );
    colorIndex++;
    if(colorIndex > colors.length-1)
        colorIndex = 0;
}

//Initialize Comet Particles
colorIndex = 0;
for(let i=0; i<AMOUNT_OF_COMET_PARTICLES; i++){
cometParticles.push( new Particle(Math.floor(Math.random() * 21), 
                                i,
                                -1 + Math.random() * 2,
                                0,
                                colors[colorIndex],
                                0.0,
                                true,
                                0
                            ) );
    colorIndex++;
    if(colorIndex > colors.length-1)
        colorIndex = 0;
}


function updateParticles(type) {
    if(type=="comets"){
        //Fade dataBuffer array
        for (let r = 0; r < 6; r++) {
            for(let c=0; c < 21; c++)
                dataBuffer[r][c] *= 0.3;
        }
    }else{
        //Fill dataBuffer array with 0's
        for (let r = 0; r < 6; r++) {
            dataBuffer[r] = new Array(22).fill(0);
        }
    }

    if(type=="balls"){
        for(let particle of ballParticles){
            dataBuffer[Math.floor(particle.yPos)][Math.floor(particle.xPos)] = particle.color;
            particle.update();    
        }
    }else if(type=="fountain"){
        for(let particle of fountainParticles){
            if(particle.color < 1) particle.reset();
            if(particle.xPos < 22 && particle.yPos < 6 && particle.xPos >= 0 && particle.yPos >= 0)
                dataBuffer[Math.floor(particle.yPos)][Math.floor(particle.xPos)] = particle.color;
            particle.update(); 
        }   
    }else if(type=="comets"){
        for(let particle of cometParticles){
            dataBuffer[Math.floor(particle.yPos)][Math.floor(particle.xPos)] = particle.color;
            particle.update(); 
        }   
    }else if(type=="explosion"){
        for(let particle of explosionParticles2){
            dataBuffer[Math.floor(particle.yPos)][Math.floor(particle.xPos)] = particle.color;
            particle.update();
        }
        for(let particle of explosionParticles){
            dataBuffer[Math.floor(particle.yPos)][Math.floor(particle.xPos)] = particle.color;
            particle.update();
        }
        if( explosionParticles.every((particle) => particle.done==true) && explosionParticles2.every((particle) => particle.done==true) ) {
            let newXPos = Math.floor(Math.random() * 21);
            for(let particle of explosionParticles){
                particle.xPosInitial = newXPos;
                particle.reset();
            }
            for(let particle of explosionParticles2){
                particle.xPosInitial = newXPos;
                particle.reset();
            }
        }
    }else if(type=="randomexplosion"){
        for(let particle of randomExplosionParticles2){
            dataBuffer[Math.floor(particle.yPos)][Math.floor(particle.xPos)] = particle.color;
            particle.update();
        }
        for(let particle of randomExplosionParticles){
            dataBuffer[Math.floor(particle.yPos)][Math.floor(particle.xPos)] = particle.color;
            particle.update();
        }
        if( randomExplosionParticles.every((particle) => particle.done==true) && randomExplosionParticles2.every((particle) => particle.done==true) ) {
            let newXPos = Math.floor(Math.random() * 21);
            randomColor = colors[Math.floor(Math.random()*colors.length)];
            randomColor2 = RGBtoHEXColor(Math.floor(getRed(randomColor)*.25), Math.floor(getGreen(randomColor)*.25), Math.floor(getBlue(randomColor)*.25));

            for(let particle of randomExplosionParticles){
                particle.xPosInitial = newXPos;
                particle.colorInitial = randomColor;
                particle.reset();
            }
            for(let particle of randomExplosionParticles2){
                particle.xPosInitial = newXPos;
                particle.colorInitial = randomColor2;
                particle.reset();
            }
        }
    }

    keyboardEffect.sendDataBuffer(dataBuffer);
}

function createRaZBalls(){
    if(!ballParticlesRunning){
        clearAllTimers();
        ballParticleTimer = setInterval(updateParticles, 80, "balls");
        ballParticlesRunning = true;
    }else{
        clearInterval(ballParticleTimer);
        ballParticlesRunning = false;
    }
}

function createRaZFountain(){
    if(!fountainParticlesRunning){
        clearAllTimers();
        fountainParticleTimer = setInterval(updateParticles, 80, "fountain");
        fountainParticlesRunning = true;
    }else{
        clearInterval(fountainParticleTimer);
        fountainParticlesRunning = false;
    }
}

function createRaZComets(){
    if(!cometParticlesRunning){
        clearAllTimers();
        cometParticleTimer = setInterval(updateParticles, 80, "comets");
        cometParticlesRunning = true;
    }else{
        clearInterval(cometParticleTimer);
        cometParticlesRunning = false;
    }
}

function createRaZExplosion(){
    if(!explosionParticlesRunning){
        clearAllTimers();
        explosionParticleTimer = setInterval(updateParticles, 70, "explosion");
        explosionParticlesRunning = true;
    }else{
        clearInterval(explosionParticleTimer);
        explosionParticlesRunning = false;
    }
}

function createRaZRandomExplosion(){
    if(!randomExplosionParticlesRunning){
        clearAllTimers();
        randomExplosionParticleTimer = setInterval(updateParticles, 70, "randomexplosion");
        randomExplosionParticlesRunning = true;
    }else{
        clearInterval(randomExplosionParticleTimer);
        randomExplosionParticlesRunning = false;
    }
}

function clearAllTimers() {
    if(ballParticlesRunning){
        clearInterval(ballParticleTimer);
        ballParticlesRunning = false;
    }
    if(fountainParticlesRunning){
        clearInterval(fountainParticleTimer);
        fountainParticlesRunning = false;
    }
    if(cometParticlesRunning){
        clearInterval(cometParticleTimer);
        cometParticlesRunning = false;
    }
    if(explosionParticlesRunning){
        clearInterval(explosionParticleTimer);
        explosionParticlesRunning = false;
    }
    if(randomExplosionParticlesRunning){
        clearInterval(randomExplosionParticleTimer);
        randomExplosionParticlesRunning = false;
    }
}