$(document).ready(function(){

  var  paused = false;
  var FPS = 25;
  var w = 350;
  var h = 600;


    //init
    var canvas = $("<canvas id=\"pong\" width='" + w + "' height='" + h + "'></canvas>");
    canvas.appendTo('body');

    var ctx = canvas.get(0).getContext("2d");

    var ball = new Ball(w/2, h/2);
    var bar = new Bar(w/2, h-20);

    function update()
    {
      console.log("updating");
      if(keydown.left)
      {
        bar.posX += (bar.posX-bar.width/2 > 0) ? -10 : 0;
      }
      else if(keydown.right)
      {
        bar.posX += (bar.posX+bar.width/2 < w) ? 10 : 0;
      }

      ball.update();
    }

    function draw()
    {
      //draw
      ctx.clearRect(0, 0, w, h);
      ball.draw(ctx);
      bar.draw(ctx);
    }

    setInterval(function() 
    {
      if(!paused)
      {
        update();
        draw();
      }
    }, 1000/FPS);


  //classes
  function Bar(posX, posY)
  {
     this.posX = posX;
     this.posY = posY;
     this.width = 60;
     this.height = 8;
  }
  Bar.prototype.draw = function(ctx)
  {
    ctx.fillRect(this.posX-this.width/2, this.posY, this.width, this.height);
  }

  function Ball(posX, posY)
  {
    this.posX = posX;
    this.posY = posY;
    this.velX = Math.floor((Math.random()*10)+1);
    this.velY = -Math.floor((Math.random()*20)+1);
    this.size = 10;
  }
  Ball.prototype.draw = function(ctx)
  {
    ctx.save(); 
    ctx.shadowBlur = 5;  
    ctx.shadowColor = "rgb(0, 0, 0)";  
    ctx.beginPath();  
    ctx.arc(this.posX, this.posY, this.size, 0, Math.PI*2, false);  
    ctx.closePath();  
    ctx.fill(); 
    ctx.restore();
  }
  Ball.prototype.update = function()
  {
    var width = w;
    var height = h;
    var newPosX = this.velX + this.posX;
    var newPosY = this.velY + this.posY;
      if(newPosY - this.size < 0)
      {
         this.velY *= -1;
      }
      else if(newPosX - this.size < 0 || newPosX + this.size > w)
      {
         this.velX *= -1;
      }
      else if( newPosY+this.size/2  > bar.posY  && Math.abs(newPosX - bar.posX) < bar.width/2 )
      {
       this.velY *= -1; 
      }
      else if(newPosY >= height)
      {
         this.posX = Math.floor(Math.random()*width);
         this.posY = Math.floor(Math.random()*height);
         paused = true;
      }
    this.posX += this.velX;
    this.posY += this.velY;
  }


  //UI

  $(document).bind("keydown.space", function() { paused = !paused});

});
