define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/paginatedList.tmpl.html'
], function($, _, Backbone, tmpl) {

	'use strict';

	var PaginatedListView = Backbone.View.extend({

		template: _.template(tmpl),

		events: {
			'click #prev.activable': 'prevPage',
			'click #next.activable': 'nextPage'
		},

		initialize: function() {
			_.bindAll(this, 'renderItem', '_renderItem', 'removeItemViews', 'resetList', 'render',
				'prevPage', 'nextPage', 'updatePaginationButtons');

			this.onInitialize();
			this.listenTo(this.collection, 'add', this._renderItem);
			this.listenTo(this.collection, 'reset', this.resetList);
			this.listenTo(this.collection, 'search end', this.updatePaginationButtons);
		},

		render: function() {
			// console.log('render');

			this.$el.html(this.template());
			this.listEl = this.$('#items-list');
			if (this.listElClass) {
				this.listEl.addClass(this.listElClass);
			}
			this.pageButtons = {
				'prev': this.$('#prev'),
				'next': this.$('#next')
			};
			this.collection.each(this._renderItem);

			return this;
		},


		onClose: function() {
			this.removeItemViews();
		},

		_renderItem: function(e) {
			var view = this.renderItem(e);
			view.listenTo(this, 'clean_up', view.close);
			this.listEl.append(view.el);
		},

		removeItemViews: function() {
			this.trigger('clean_up');
		},

		resetList: function() {
			this.removeItemViews();
			if (this.listEl) { // TODO try to reuse views
				this.listEl.html('');
			}
		},

		prevPage: function() {
			// console.log('prev-page');
			this.collection.fetchPrevPage();
		},

		nextPage: function() {
			// console.log('next-page');
			this.collection.fetchNextPage();
		},

		updatePaginationButtons: function(__, hasPrevious, hasNext) {
			var pageButtons = this.pageButtons,
				classes = 'on-hover-link activable link-blue hover-underline';

			if (pageButtons) {
				setPageSelector('prev', hasPrevious);
				setPageSelector('next', hasNext);
			}

			function setPageSelector(selector, activate) {
				// console.log(selector, activate);
				var $el = pageButtons[selector];
				$el[activate ? 'addClass' : 'removeClass'](classes);
			}

		}

	});

	return PaginatedListView;

});
