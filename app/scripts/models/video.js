define([
	'jquery',
	'underscore',
	'backbone',
	'services/YouTubeService'
], function($, _, Backbone, ytService) {

	'use strict';

	var Video = Backbone.Model.extend({

		defaults: {
			title: '',
			channelId: '', // TODO change to channel object
			channelTitle: '',
			publishedAt: undefined, // string date
			// media
			thumbnail: '',
			embedLink: '',
			// details
			views: 0,
			duration: '0',
			description: '',
			likeCount: 0,
			dislikeCount: 0,
			commentCount: 0
		},

		initialize: function() {
			_.bindAll(this, 'fetch_', 'readFromYouTubeAPIObject');
		},

		fetch_: function(successCallback, failCallback) {
			var self = this;

			ytService.getVideo(this.id, {
				success: onVideoGetSuccess,
				failure: onVideoGetFail
			});

			function onVideoGetSuccess(e) {
				self.readFromYouTubeAPIObject(e);
				if (successCallback !== undefined) {
					successCallback(self);
				}
			}

			function onVideoGetFail() {
				console.log('Could not get video: \'{0}\''.fmt(self.id));
				if (failCallback !== undefined) {
					failCallback(self.id);
				}
			}
		},

		readFromYouTubeAPIObject: function(e) {
			this.set('title', e.snippet.title);
			this.set('channelId', e.snippet.channelId);
			this.set('channelTitle', e.snippet.channelTitle);
			this.set('publishedAt', e.snippet.publishedAt);
			this.set('thumbnail', e.snippet.thumbnails['default'].url);
			this.set('description', e.snippet.description);

			if (e.player) {
				this.set('embedLink', e.player.embedHtml);
			}
			if (e.statistics) {
				this.set('views', e.statistics.viewCount);
				this.set('likeCount', e.statistics.likeCount);
				this.set('dislikeCount', e.statistics.dislikeCount);
				this.set('commentCount', e.statistics.commentCount);
			}
			if (e.contentDetails) {
				this.set('duration', e.contentDetails.duration);
			}
		}

	});

	return Video;
});
