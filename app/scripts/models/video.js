define([
	'jquery',
	'underscore',
	'backbone',
	'services/YouTubeService'
], function($, _, Backbone, ytService) {

	'use strict';

	var Video = Backbone.Model.extend({
		defaults: {
			// youTube data
			youTubeId: '',
			title: '',
			channelId: '',
			channelTitle: '',
			publishedAt: '', // str date
			// media
			thumbnail: '',
			embedLink: '',
			// details
			views: 0,
			duration: '0',
			description: '',
			likeCount: 0,
			dislikeCount: 0,
			commentCount:0
		},
		initialize: function(youTubeId, successCallback, failCallback) {
			_.bindAll(this, 'onVideoGetSuccess', 'onVideoGetFail');

			if (typeof youTubeId === 'string') {
				this.youTubeId = youTubeId;
				this.successCallback = successCallback;
				this.failCallback = failCallback;

				ytService.getVideo(youTubeId, {
					success: this.onVideoGetSuccess,
					failure: this.onVideoGetFail
				});
			}
		},

		onVideoGetSuccess: function(e) {
			/*jshint camelcase: false */
			console.log(e)

			this.set('title', e.snippet.title);
			this.set('channelId', e.snippet.channelId);
			this.set('channelTitle', e.snippet.channelTitle);
			this.set('publishedAt', e.snippet.publishedAt);
			this.set('thumbnail', e.snippet.thumbnails['default'].url);
			this.set('embedLink', e.player.embedHtml);
			this.set('views', e.statistics.viewCount);
			this.set('duration', e.contentDetails.duration);
			this.set('description', e.snippet.description);
			this.set('likeCount', e.statistics.likeCount);
			this.set('dislikeCount', e.statistics.dislikeCount);
			this.set('commentCount', e.statistics.commentCount);

			if (this.successCallback !== undefined) {
				this.successCallback(this);

				this.successCallback = undefined;
				this.failCallback = undefined;
			}
		},

		onVideoGetFail: function() {
			console.log('Could not get video: \'{0}\''.fmt(this.youTubeId));
			if (this.failCallback !== undefined) {
				this.failCallback(this.youTubeId);

				this.successCallback = undefined;
				this.failCallback = undefined;
			}
		}

	});

	return Video;
});
