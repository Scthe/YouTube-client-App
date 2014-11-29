define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {

	'use strict';

	var Channel = Backbone.Model.extend({
		//urlRoot: '/'
		defaults: {
			name: '',
			// media
			avatar: '',
			// details
			videoCount: 0,
			subscriptions: 0,
			active: false
		},

		initialize: function(attrs, opt) {
			_.bindAll(this, 'readFromYouTubeAPIObject');

			if (opt && opt.apiData) {
				this.readFromYouTubeAPIObject(opt.apiData);
			}
		},

		validate: function(attrs) {
			if (!attrs.name || attrs.name.trim().length < 1) {
				return 'Incorrect name';
			}
		},

		readFromYouTubeAPIObject: function(e) {
			this.id = typeof e.id === 'object' ? e.id.channelId : e.id;
			this.set('name', e.snippet.title);
			this.set('avatar', e.snippet.thumbnails['default'].url);
		}

	});

	return Channel;
});
