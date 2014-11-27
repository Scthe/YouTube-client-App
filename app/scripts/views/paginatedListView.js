define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/paginatedListView.tmpl.html'
], function($, _, Backbone, tmpl) {

	'use strict';

	var PaginatedListView = Backbone.View.extend({

		template: _.template(tmpl),

		events: {
			'click #prev.activable': 'prevPage',
			'click #next.activable': 'nextPage'
		},

		initialize: function() {
			_.bindAll(this, 'renderItem', 'resetList', 'render',
				'prevPage', 'nextPage', 'updatePaginationButtons');

			this.onInitialize();
			this.collection.on('add', this.renderItem, this);
			this.collection.on('reset', this.resetList, this);
		},

		render: function() {
			// console.log('render');

			this.$el.html(this.template());
			this.listEl = this.$el.find('#items-list');
			if (this.listElClass) {
				this.listEl.addClass(this.listElClass);
			}
			this.pageButtons = {
				'prev': this.$el.find('#prev'),
				'next': this.$el.find('#next')
			};
			this.collection.each(this.renderItem);

			return this;
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

	return PaginatedListView;

});
