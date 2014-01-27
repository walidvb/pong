function Game(title, options)
{
  options = $.extend({
    FPS: 15,
    w: 350,
    h: 600,
    paused: true,
    pause: '.pause',
    add: '.add-ball',
    faster: '.fps-plus',
    slower: '.fps-minus'
  }, options);
  var game = 
  {
    title: title,
    options: options,
    paused: options.paused,
    balls: new Array(),
    //init
    init: function()
    {
      game.canvas= $("<canvas id='"+title+"' width='" + game.options.w + "' height='" + game.options.h + "'></canvas>");
      game.ctx = game.canvas.get(0).getContext("2d");
      game.bar = new Bar(game.options.w/2, game.options.h-20);
      game.canvas.prependTo('#game');
      game.attachUI();
    },
    attachUI: function()
    {
        //UI
        var o = game.options;
        $(o.pause).on('click',game.pause);
        $(o.add).on('click', game.addBall);
        $(o.faster).on('click', function(){o.FPS*=1.2});
        $(o.slower).on('click', function(){o.FPS/=1.2});
        game.canvas.on('mousemove', function(evt) {
          var rect = this.getBoundingClientRect();
          var mousePos = 
          {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
          };
          game.bar.moveTo(mousePos.x);
        });
      },
      play: function()
      {
        var $this = this;
        setInterval(function() 
        {
          if(!$this.paused)
          {
            $this.update();
            $this.draw();
          }
        }, 1000/this.options.FPS);
      },
      pause: function()
      {
        console.log("pausing", game);
        game.paused = !game.paused;
      },
      addBall: function(ball)
      {
        var tmp = new BallObject(game);
        var finalBall = $.extend(tmp, ball)
        game.balls.push( finalBall );
      },
      addBalls: function(balls)
      {
        for (var i = balls.length - 1; i >= 0; i--) 
        {
          this.addBall(balls[i]);
        };
      },
      update: function()
      {
        for (var i = this.balls.length - 1; i >= 0; i--)
        {
         this.balls[i].update(this.bar);
       }
     },
     draw: function()
     {
      //draw
      this.ctx.clearRect(0, 0, this.options.w, this.options.h);
      this.bar.draw(this.ctx);
      for (var i = this.balls.length - 1; i >= 0; i--)
      {
        this.balls[i].draw(this.ctx);
      }
    }
  }
  return game;
}

//classes
function Bar(x, y)
{
  var bar = 
  {
    x: x,
    y: y,
    width: 60,
    height: 8,
    draw: function(ctx)
    {
      ctx.shadowBlur = 2;  
      ctx.fillRect(this.x-this.width/2, this.y, this.width, this.height);
    },
    moveTo: function(x)
    {
      this.x = x;
    }
  }
  return bar;
}

function BallObject(game, options)
{
  var ballObject =
  {
    ball:  new Ball(game, options),
    //Methods
    draw: function(ctx)
    {
      var x = this.ball.pos.x;
      var y = this.ball.pos.y;
      var size = this.ball.size;
      var color = this.ball.color;
      ctx.save();

      ctx.shadowBlur = 2;  
      ctx.shadowColor = color;  
      ctx.beginPath();  

      ctx.arc(x, y, size, 0, Math.PI*2, false); 
      ctx.fillStyle = color;
      ctx.fill(); 
      ctx.closePath();  
      ctx.restore();
      console.log(this);

    },
    update: function(bar)
    {
      var width = game.options.w;
      var height = game.options.h;
      var newx = this.ball.vel.x + this.ball.pos.x;
      var newy = this.ball.vel.y + this.ball.pos.y;
      //if ball collides with top
      if(newy - this.ball.size < 0)
      {
       this.ball.vel.y *= -1;
     }
     //if ball collides with wall
     else if(newx - this.ball.size < 0 || newx + this.ball.size > width)
     {
       this.ball.vel.x *= -1;
     }
     // if ball collides with bar
     else if( newy+this.ball.size/2  > bar.y  && Math.abs(newx - bar.x) < bar.width/2 )
     {
       this.ball.vel.y *= -1; 
       var angle = 3*Math.sin(Math.abs((bar.x - this.ball.pos.x)) / (bar.width/2));
       this.ball.vel.x *= angle;
     }
     //if ball gets out through bottom
     else if(newy >= height)
     {
       this.ball.pos.x = Math.floor(Math.random()*width);
       this.ball.pos.y = Math.floor(Math.random()*height);
       paused = true;
     }
     this.ball.pos.x += this.ball.vel.x;
     this.ball.pos.y += this.ball.vel.y;
   }
 };
 console.log("initial object:", ballObject);
 return ballObject;
}

function Ball(game, options)
{
  var ball= 
  {
    src: "walid",
    dest: "meret",
    pos: 
    {
      x: game.options.w/2,
      y: game.options.h/2,
    },
    vel:
    {
      x: Math.floor((Math.random()*10)+1),
      y: -Math.floor((Math.random()*10)+1),
    },
    size: 10,
    color: "black",
  };
  return ball;
}