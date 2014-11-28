define([
	'jquery',
	'underscore',
	'backbone',
	'models/videoList',
	'views/videoListItemView',
	'views/paginatedListView'
], function($, _, Backbone, VideoList, VideoListItemView, PaginatedListView) {

	'use strict';

	var VideoListView = PaginatedListView.extend({
		el: '#main-panel-content',

		listElClass: 'flex-container',

		viewIcon: 'search',

		onInitialize: function() {
			this.collection = new VideoList();
		},

		renderItem: function(item) {
			var view = new VideoListItemView({
				model: item,
				parent: this
			});
			this.listEl.append(view.render().el);
		}

	});

	return VideoListView;

});
