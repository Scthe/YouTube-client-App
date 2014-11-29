define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/videoListItem.tmpl.html'
], function($, _, Backbone, tmpl) {

	'use strict';
	/*global app*/

	var VideoListItemView = Backbone.View.extend({
		tagName: 'li',

		className: 'card flex-grid',

		template: _.template(tmpl),

		events: {
			'click .video-link': 'goToVideo',
			'click .id-channel': 'goToChannel'
		},

		initialize: function() {
			_.bindAll(this, 'render', 'goToVideo', 'goToChannel');
			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		goToVideo: function() {
			app.router.navigate('video/{0}'.fmt(this.model.id), {
				trigger: true
			});
		},

		goToChannel: function() {
			app.router.navigate('channel/{0}'.fmt(this.model.get('channelId')), {
				trigger: true
			});
		}

	});

	return VideoListItemView;
});
