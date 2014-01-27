var serverIP = "127.0.0.1";
var clientID = "walid";
var destID = "meret";

function Client(settings)
{
	var client =
	{
		//Attributes
		settings: $.extend( 
			{
				title: "ping",
				serverIP: "127.0.0.1",
				id: clientID,
			}, settings),
		items: new Array(),
		game: "",
		//Methods
		init: function()
		{
			this.game = new Game(this.settings.title, 
			{
				FPS: 45,
			});
			this.items = this.getItems();
			this.game.init();
			this.game.addBalls(this.items.balls);
			console.log("Game initialized");
		},
		play: function()
		{
			this.game.play();
		},
		//client-server logic
		getItems: function()
		{
			var items = data;
			return items;	
		},
		setItems: function()
		{
			
		},
	}
	return client;
}

$(document).ready(function(){
	var client = new Client();
  	client.init();
  	client.play();
});

var data = 
{
	balls:
	[
		{
		    src: "meret",
		    dest: "meret",
		    pos: 
		    {
		      x: 350/2,
		      y: 600/2,
		    },
		    vel:
		    {
		      x: Math.floor((Math.random()*10)+1),
		      y: -Math.floor((Math.random()*10)+1),
		    },
		    size: 10,
		    color: "black",
  		},
  		{
		    src: "walid",
		    dest: "meret",
		    pos: 
		    {
		      x: 350/2,
		      y: 600/3,
		    },
		    vel:
		    {
		      x: Math.floor((Math.random()*10)+1),
		      y: -Math.floor((Math.random()*10)+1),
		    },
		    size: 8,
		    color: "red",
  		},
  		{
		    src: "walid",
		    dest: "meret",
		    pos: 
		    {
		      x: 350/4,
		      y: 600/5,
		    },
		    vel:
		    {
		      x: Math.floor((Math.random()*10)+1),
		      y: -Math.floor((Math.random()*10)+1),
		    },
		    size: 12,
		    color: "blue",
  		},
	]
}