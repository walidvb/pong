#classes present in the game

class Ball
	constructor: (properties) ->
		{@pos, @vel, @src, @dest} = properties
	
	@update = (bar) ->
	    width = game.options.w
	    height = game.options.h
	    newx = @ball.vel.x + @ball.pos.x
	    newy = @ball.vel.y + @ball.pos.y
	    
	    #if ball collides with top
	    if newy - @ball.size < 0
	      @ball.vel.y *= -1
	    
	    #if ball collides with wall
	    else if newx - @ball.size < 0 or newx + @ball.size > width
	      @ball.vel.x *= -1
	    
	    # if ball collides with bar
	    else if newy + @ball.size / 2 > bar.y and Math.abs(newx - bar.x) < bar.width / 2
	      @ball.vel.y *= -1
	      angle = 3 * Math.sin(Math.abs((bar.x - @ball.pos.x)) / (bar.width / 2))
	      @ball.vel.x *= angle
	    
	    #if ball gets out through bottom
	    else if newy >= height
	      @ball.pos.x = Math.floor(Math.random() * width)
	      @ball.pos.y = Math.floor(Math.random() * height)
	      paused = true
	    @ball.pos.x += @ball.vel.x
	    @ball.pos.y += @ball.vel.y

class Bar
	constructor: (properties) ->

	move: delta ->
		@pos.x += delta.x
		@pos.y += delta.y
		@pos
	