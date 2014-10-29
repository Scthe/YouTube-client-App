'use strict';
/*global app, Backbone, _*/

app.VideoListItemView = Backbone.View.extend({
	tagName: 'article',

	// className:'card video-card .col-md-4',
	className: 'card video-card',

	template: _.template($('#video-card-template').html()),

	events: {
		'click .video-card-thumb': 'goToVideo',
		'click .video-card-title': 'goToVideo'
	},

	initialize: function() {
		this.render();
	},

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},

	goToVideo: function() {
		app.router.navigate('video/' + this.model.id, {
			trigger: true
		});
	}
});