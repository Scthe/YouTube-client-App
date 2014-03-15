var Router = Backbone.Router.extend({
	routes: {
		"": "home",
		"video/:id": "video",
		"channel/:id": "channel"
	}
});

app.router = new Router;

app.router.on('route:home', function () {
	console.log("routed to home");
	
	// render left subscription panel
	app.channelListView.render();
	
	// render content
	//app.videoListView.render();
	$("#main-panel-content").html(API_KEY);
	
	// add pseudo-console on top
	if( Settings.get("debug") && typeof($("#main-panel-content") == undefined)){
		$("#main-panel-content").before("<pre id=\"pseudo-console\"></pre>");
		app.log = function( t){$("#pseudo-console").append(t+"</br>");};
	}
	app.search("Android");
});

app.router.on('route:channel', function (id) {
	console.log("routed to channel '"+id+"'");
	
	// set active channels
	app.channelList.each(function(e){
		e.set("active",e.id==id);
	});
	
	// render left subscription panel
	app.channelListView.render();
	
	// change view title
	m = app.channelList.get(id);
	$("#view-title-text").html(m.get("name")+"'s Channel");
	
	// render content
	app.videoListView.render();
});

app.router.on('route:video', function (id) {
	console.log("routed to video '"+id+"'");
	
	// change view title
	m = app.videoList.get(id);
	$("#view-title-text").html(m.get("name"));
	
	// render content
	app.videoView.setVideo(m);
	app.videoView.render();
});

Backbone.history.start();
