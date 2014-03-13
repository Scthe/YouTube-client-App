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
	testView.render();
});

app.router.on('route:channel', function (id) {
	console.log("routed to channel '"+id+"'");
	// set as active
	app.channelList.each(function(e){
		e.set("active",e.id==id);
	});
	
	// render left subscription panel
	app.channelListView.render();
	
	// change view title
	m = app.channelList._byId[id];
	$("#view-title-text").html(m.get("name")+"'s Channel");
	
	// render content
	app.videoListView.render();
});

app.router.on('route:video', function (id) {
	console.log("routed to video '"+id+"'");
	
	// change view title
	m = app.channelList._byId[id];
	$("#view-title-text").html(id);
	
	// render content
	$("#main-panel-content").html("Video: "+id);
});

Backbone.history.start();
