//vars 
boolean paused;

PVector posBall;
PVector velBall;
PVector sizeBall;

PVector posBar;
PVector sizeBar;
int yBar;
void setup()
{
  size(480, 600);
  frameRate(30);
  sizeBar = new PVector(50.0, 5.0);
  sizeBall = new PVector(10, 10);
  yBar = 10;
  posBar = new PVector((width - sizeBar.x)/2, height - yBar);
  posBall = new PVector(random(width), yBar + random(height - yBar));
  velBall = new PVector(random(10), -random(20));
  
}

void draw()
{
  background(250);
  checkKeys();
  update();
  drawBall();
  drawBar();
}

void drawBar()
{
  fill(0);
  rectMode(CENTER);
  rect(posBar.x, posBar.y, sizeBar.x, sizeBar.y);
}

void drawBall()
{
  fill(0);
  ellipse(posBall.x, posBall.y, sizeBall.x, sizeBall.y);
}

void update()
{
  if(!paused)
  {
    PVector newPos = PVector.add(posBall,velBall);

    if(newPos.y - sizeBall.y < 0)
    {
       velBall.y *= -1;
    }
    else if(newPos.x - sizeBall.x < 0 || newPos.x + sizeBall.y > width)
    {
       velBall.x *= -1;
    }
    else if( newPos.y+sizeBall.y  > height - yBar+sizeBar.y && abs(newPos.x - posBar.x) < sizeBar.x/2 )
    {
     velBall.y *= -1; 
    }
    else if(newPos.y > height)
    {
       posBall = new PVector(random(width), yBar + random(height- yBar)); 
       paused = true;
    }
    posBall.add(velBall);
  }
}

void checkKeys()
{
  if(!paused)
  {
    if(keyPressed == true)
    {
       if(key == 'a' && posBar.x-sizeBar.x/2 > 0)
      {
         posBar.x -= 10;
      } 
       if(key == 'd' && posBar.x+sizeBar.x/2 < width)
      {
         posBar.x += 10;
      } 
    }
  }
}

void keyPressed()
{
   if(key == 's')
  {
   paused = !paused; 
  } 
}
