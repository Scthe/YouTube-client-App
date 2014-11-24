define(function() {

	'use strict';

	var apiCallBeforeAPIWasLoaded,
		executeGoogleApiCall = function(f) {
			apiCallBeforeAPIWasLoaded = f;
		};

	window.registerYouTubeApiHandler(function(YouTubeApiClient) {
		executeGoogleApiCall = function(f) {
			if (f !== undefined) {
				f(YouTubeApiClient);
			}
		};
		executeGoogleApiCall(apiCallBeforeAPIWasLoaded);
	});

	return {
		search: search,
		videoDetails: videoDetails
	};

	/*
	 * https://developers.google.com/youtube/v3/docs/videos
	 */
	function videoDetails(videoId, callback) {
		executeGoogleApiCall(f);

		function f(yt) {
			var request = yt.videos.list({
				id: videoId,
				part: 'snippet,statistics,player,contentDetails',
				maxResults: 1
			});

			request.execute(function(response) {
				var json = response.result;
				if (json.items.length === 1) {
					callback.success(json.items[0]);
				} else {
					callback.failure(videoId);
				}
			});

		}
	}


	/*
	 * https://developers.google.com/youtube/v3/docs/search
	 * https://developers.google.com/youtube/v3/docs/search/list
	 */
	function search(searchTerm, pageToken, resultCount, callback) {
		var query = {
			q: searchTerm,
			part: 'snippet',
			type: 'video',
			maxResults: resultCount
		};
		if (pageToken) {
			query.pageToken = pageToken;
		}

		executeGoogleApiCall(function(yt) {
			var request = yt.search.list(query);

			request.execute(function(response) {
				callback(searchTerm, response.result);
			});
		});
	}



});
