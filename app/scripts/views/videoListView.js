define([
	'jquery',
	'underscore',
	'backbone',
	'models/videoList',
	'views/videoListItemView',
	'text!templates/videoListView.tmpl.html'
], function($, _, Backbone, VideoList, VideoListItemView, tmpl) {

	'use strict';

	var VideoListView = Backbone.View.extend({
		el: '#main-panel-content',

		template: _.template(tmpl),

		events: {
			'click #prev.activable': 'prevPage',
			'click #next.activable': 'nextPage'
		},

		initialize: function() {
			_.bindAll(this, 'renderVideo', 'resetVideoList', 'render',
				'prevPage', 'nextPage', 'updatePaginationButtons');

			this.videoList = new VideoList();
			this.videoList.on('add', this.renderVideo, this);
			this.videoList.on('reset', this.resetVideoList, this);
		},

		render: function() {
			var self = this;
			// console.log('render');

			this.$el.html(this.template());
			this.listEl = this.$el.find('#video-list');
			this.pageButtons = {
				'prev': this.$el.find('#prev'),
				'next': this.$el.find('#next')
			};
			this.videoList.each(self.renderVideo);

			return this;
		},

		renderVideo: function(video) {
			var view = new VideoListItemView({
				model: video,
				parent: this
			});
			this.listEl.append(view.render().el);
		},

		resetVideoList: function() {
			if (this.listEl) { // TODO try to reuse views
				this.listEl.html('');
			}
		},

		prevPage: function() {
			// console.log('prev-page');
			this.videoList.fetchPrevPage(this.updatePaginationButtons);
		},

		nextPage: function() {
			// console.log('next-page');
			this.videoList.fetchNextPage(this.updatePaginationButtons);
		},

		updatePaginationButtons: function(hasPrevious, hasNext) {
			var self = this,
				classes = 'on-hover-link activable link-blue hover-underline';

			setPageSelector('prev', hasPrevious);
			setPageSelector('next', hasNext);

			function setPageSelector(selector, activate) {
				// console.log(selector, activate);
				var $el = self.pageButtons[selector];
				$el[activate ? 'addClass' : 'removeClass'](classes);
			}
		}

	});

	return VideoListView;

});
