'use strict';
/*global app, API_KEY*/

app.__scheduledCalls = [];

app.scheduleGoogleApiCall = function(f) {
	app.__scheduledCalls.push(f);
};

var GOOGLE_YOU_TUBE_API_LOADED = false;

function executeGoogleApiCalls() {
	gapi.client.setApiKey(API_KEY);
	gapi.client.load('youtube', 'v3', function() {
		//if(Settings.get('debug'))
		//	app.log('executeGoogleApiCalls() - library loaded');
		$.each(app.__scheduledCalls, function(i, e) {
			e(gapi.client.youtube);
		});
		app.__scheduledCalls = [];
		GOOGLE_YOU_TUBE_API_LOADED = true;
	});
}


/*
 * https://developers.google.com/youtube/v3/docs/videos
 */
app.videoDetails = function(id) {
	app.log('loading video: \'' + id);
	var idList = id;

	app.scheduleGoogleApiCall(function(yt) {
		var request = yt.videos.list({
			id: idList,
			part: 'snippet,statistics,player,contentDetails',
			maxResults: 1
		});

		//app.log( 'AJAX sending !');
		request.execute(function(response) {
			//app.log( 'AJAX response !');
			var json = response.result;
			//app.log(JSON.stringify(json, undefined, 2));
			if (json.items.length === 1) {
				var e = json.items[0];
				app.videoView.setVideo(new app.Video({
					youTube_id: e.id,
					youTube_channel_id: e.snippet.channelId,
					youTube_embed_Html: e.player.embedHtml,
					thumbnail: e.snippet.thumbnails['default'].url,

					name: e.snippet.title,
					user: e.snippet.channelTitle,
					created_on: e.snippet.publishedAt,

					view_count: e.statistics.viewCount,
					time: e.contentDetails.duration,
					description: e.snippet.description
				}));
				app.videoView.render();
			}
			app.log('###');
		});
	});
	if (GOOGLE_YOU_TUBE_API_LOADED){
		executeGoogleApiCalls();
	}
};


/*
 * https://developers.google.com/youtube/v3/docs/search
 * https://developers.google.com/youtube/v3/docs/search/list
 */
app.search = function(searchTerm, page) {
	// TODO add pages
	app.log('searching for: \'' + searchTerm + '\', page: ' + page);
	$('#search-loading').show();
	app.videoList.reset();

	app.scheduleGoogleApiCall(function(yt) {
		var request = yt.search.list({
			q: searchTerm,
			part: 'snippet',
			type: 'video',
			maxResults: 3
		});

		//app.log( 'AJAX sending !');
		request.execute(function(response) {
			//app.log( 'AJAX response !');
			var json = response.result;
			//app.videoList.reset();
			$.each(json.items, function(i, e) {
				app.videoList.create({
					name: e.snippet.title,
					user: e.snippet.channelTitle,
					time: '2:41', // TODO hardcoded
					view_count: '502', // TODO hardcoded
					thumbnail: e.snippet.thumbnails['default'].url,
					created_on: e.snippet.publishedAt,
					youTube_id: e.id.videoId // TODO when the search result is a channel this will be undefined
				});
			});
			app.videoList.localStorage.save();
			$('#search-input-icon').show();
			$('#search-loading').hide();
			app.log('###');
		});
	});
	if (GOOGLE_YOU_TUBE_API_LOADED){
		executeGoogleApiCalls();
	}
};