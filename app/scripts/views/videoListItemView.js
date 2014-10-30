define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/videoListItem.tmpl.html'
], function($, _, Backbone, tmpl) {

	'use strict';

	var VideoListItemView = Backbone.View.extend({
		tagName: 'article',

		// className:'card video-card .col-md-4',
		className: 'card video-card',

		template: _.template(tmpl),

		events: {
			'click .video-link': 'goToVideo'
		},

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		goToVideo: function() {
			/*global app*/
			app.router.navigate('video/' + this.model.id, {
				trigger: true
			});
		}
	});

	return VideoListItemView;
});