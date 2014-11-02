define(function() {

	'use strict';
	/*global youTubeApiLoaded, youTubeApiCalls, executeGoogleApiCalls*/

	return {
		search: search,
		videoDetails: videoDetails
	};

	function scheduleGoogleApiCall(f) {
		youTubeApiCalls.push(f);

		// try to invoke now
		if (youTubeApiLoaded) {
			executeGoogleApiCalls();
		}
	}

	/*
	 * https://developers.google.com/youtube/v3/docs/videos
	 */
	function videoDetails(id, callback) {
		var idList = id;

		scheduleGoogleApiCall(function(yt) {
			var request = yt.videos.list({
				id: idList,
				part: 'snippet,statistics,player,contentDetails',
				maxResults: 1
			});

			request.execute(function(response) {
				var json = response.result;
				if (json.items.length === 1) {
					callback.success(json.items[0]);
				} else {
					callback.failure(id);
				}
			});
		});
	}


	/*
	 * https://developers.google.com/youtube/v3/docs/search
	 * https://developers.google.com/youtube/v3/docs/search/list
	 */
	function search(searchTerm, page, callback) {
		// TODO add pages

		scheduleGoogleApiCall(function(yt) {
			var request = yt.search.list({
				q: searchTerm,
				part: 'snippet',
				type: 'video',
				maxResults: 10
			});

			request.execute(function(response) {
				var json = response.result;
				callback(json.items);
			});
		});
	}

});