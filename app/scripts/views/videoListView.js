define([
	'jquery',
	'underscore',
	'backbone',
	'../models/videoList',
	'views/videoListItemView'
], function($, _, Backbone, videoList, VideoListItemView) {

	'use strict';

	var VideoListView = Backbone.View.extend({
		el: '#main-panel-content',

		initialize: function() {
			_.bindAll(this, 'onAdd', 'resetAll', 'render');
			videoList.on('add', this.onAdd, this);
			videoList.on('reset', this.resetAll, this);
			videoList.fetch();
		},

		render: function() {
			this.$el.html('');
			var that = this;
			videoList.each(function(e) {
				that.onAdd(e);
			});
		},

		onAdd: function(video) {
			var view = new VideoListItemView({
				model: video,
				parent: this
			});
			this.$el.append(view.render().el);
		},

		resetAll: function() {
			this.$el.html('');
		}
	});

	return VideoListView;

});