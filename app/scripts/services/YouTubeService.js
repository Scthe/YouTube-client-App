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
		search: searchVideo,
		getVideo: getVideo,
		getChannel: getChannel,
		getChannelVideos: getChannelVideos,
		searchChannel: searchChannel
	};

	/*
	 * https://developers.google.com/youtube/v3/docs/videos
	 */
	function getVideo(videoId, callback) {
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

	function getChannel(name, callback) {
		searchChannel(name, undefined, 1, function(_, r) {
			callback(r.items[0]);
		});
	}

	function getChannelVideos(channelId, pageToken, resultCount, callback) {
		var query = {
			type: 'video',
			channelId: channelId,
			part: 'snippet',
			maxResults: resultCount,
			order: 'viewCount'
		};
		if (pageToken) {
			query.pageToken = pageToken;
		}

		executeGoogleApiCall(function(yt) {
			var request = yt.search.list(query);

			request.execute(function(response) {
				callback(channelId, response.result);
			});
		});
	}


	function searchVideo(searchTerm, pageToken, resultCount, callback) {
		return search('video', searchTerm, pageToken, resultCount, callback);
	}

	function searchChannel(searchTerm, pageToken, resultCount, callback) {
		return search('channel', searchTerm, pageToken, resultCount, callback);
	}

	/*
	 * https://developers.google.com/youtube/v3/docs/search
	 * https://developers.google.com/youtube/v3/docs/search/list
	 */
	function search(type, searchTerm, pageToken, resultCount, callback) {
		var query = {
			type: type,
			q: searchTerm,
			part: 'snippet',
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
