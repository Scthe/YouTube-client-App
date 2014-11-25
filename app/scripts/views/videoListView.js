define([
	'jquery',
	'underscore',
	'backbone',
	'models/videoList',
	'views/videoListItemView',
	'text!templates/paginatedListView.tmpl.html'
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
			_.bindAll(this, 'renderItem', 'resetList', 'render',
				'prevPage', 'nextPage', 'updatePaginationButtons');

			this.collection = new VideoList();
			this.collection.on('add', this.renderItem, this);
			this.collection.on('reset', this.resetList, this);
		},

		render: function() {
			// console.log('render');

			this.$el.html(this.template());
			this.listEl = this.$el.find('#items-list');
			this.listEl.addClass('flex-container');
			this.pageButtons = {
				'prev': this.$el.find('#prev'),
				'next': this.$el.find('#next')
			};
			this.collection.each(this.renderItem);

			return this;
		},

		renderItem: function(item) {
			var view = new VideoListItemView({
				model: item,
				parent: this
			});
			this.listEl.append(view.render().el);
		},

		resetList: function() {
			if (this.listEl) { // TODO try to reuse views
				this.listEl.html('');
			}
		},

		prevPage: function() {
			// console.log('prev-page');
			this.collection.fetchPrevPage(this.updatePaginationButtons);
		},

		nextPage: function() {
			// console.log('next-page');
			this.collection.fetchNextPage(this.updatePaginationButtons);
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
