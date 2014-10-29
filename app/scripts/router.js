'use strict';
/*global app, Backbone, API_KEY*/

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'video/:id': 'video',
		'channel/:id': 'channel',
		'search/:term/:page': 'search'
	}
});

app.router = new Router();

app.router.on('route:home', function() {
	console.log('routed to home');

	// render left subscription panel
	app.channelListView.render();

	// render content
	//app.videoListView.render();
	$('#main-panel-content').html(API_KEY);

	// add pseudo-console on top
	if (Settings.get('debug') && ($('#pseudo-console')[0] === undefined)) {
		$('#main-panel-content').before('<pre id=\"pseudo-console\"></pre>');
		app.log = function(t) {
			$('#pseudo-console').append(t + '</br>');
		};
	}
});

app.router.on('route:channel', function(id) {
	console.log('routed to channel \'' + id + '\'');

	// set active channels
	app.channelList.each(function(e) {
		e.set('active', e.id === id);
	});

	// render left subscription panel
	app.channelListView.render();

	// change view title
	var m = app.channelList.get(id);
	$('#view-title-text').html(m.get('name') + '\'s Channel');

	// render content
	app.videoListView.render();
});

app.router.on('route:video', function(id) {
	console.log('routed to video \'' + id + '\'');
	// add pseudo-console on top
	if (Settings.get('debug') && ($('#pseudo-console')[0] === undefined)) {
		$('#main-panel-content').before('<pre id=\"pseudo-console\"></pre>');
		app.log = function(t) {
			$('#pseudo-console').append(t + '</br>');
		};
	}

	// find the selected model
	// ( due to 'app.videoList.reset()' resetting the _byId look up we have to do it by hand)
	var m;
	app.videoList.each(function(e) {
		//app.log("\t "+e.id+"("+(e.id==id)+")");
		if (e.id === id) {
			m = e;
		}
	});
	if (m) {
		//console.log(m);
		// change view title
		//console.log("dict:"+app.videoList._byId);
		$('#view-title-text').html(m.get('name'));

		// call for more details
		app.videoDetails(m.get('youTube_id'));

		// render content
		//app.videoView.setVideo(m);
		//app.videoView.render(); // TODO display video description
	} else {
		// TODO on video look up error
		console.log('err!');
	}
});

app.router.on('route:search', function(term, page) {
	console.log('routed to search for: \'' + term + '\', page: ' + page);
	// add pseudo-console on top
	if (Settings.get('debug') && ($('#pseudo-console')[0] === undefined)) {
		$('#main-panel-content').before('<pre id=\'pseudo-console\'></pre>');
		app.log = function(t) {
			$('#pseudo-console').append(t + '</br>');
		};
	}

	// set active channels
	app.channelList.each(function(e) {
		e.set('active', false);
	});

	// render left subscription panel
	app.channelListView.render();

	// change view title
	$('#view-title-text').html('Search');

	// download data
	app.search(term, page);


	// render content
	//app.videoListView.render();

});

Backbone.history.start();