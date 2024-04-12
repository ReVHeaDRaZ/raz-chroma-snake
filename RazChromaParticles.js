
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