define([
	'jquery',
	'underscore',
	'backbone',
	'../models/videoList',
	'views/videoListItemView',
	'text!templates/videoListView.tmpl.html'
], function($, _, Backbone, VideoList, VideoListItemView, tmpl) {

	'use strict';
	/*global app*/

	var VideoListView = Backbone.View.extend({
		el: '#main-panel-content',

		template: _.template(tmpl),

		events: {
			'click #prev.activable': 'prevPage',
			'click #next.activable': 'nextPage'
		},

		initialize: function(term, page) {
			var self = this;
			_.bindAll(this, 'renderVideo', 'resetVideoList', 'render',
				'prevPage', 'nextPage', 'setPageSelector');

			this.term = term;
			this.page = page;

			this.videoList = new VideoList();
			this.videoList.on('add', this.renderVideo, this);
			this.videoList.on('reset', this.resetVideoList, this);

			// kick off search
			this.videoList.fetch_(term, page, function() {
				self.setPageSelector('prev', self.page !== 1);
				self.setPageSelector('next', true);
			});

			this.render();
		},

		render: function() {
			this.$el.html(this.template());
			this.listEl = this.$el.find('#video-list');
			this.pageButtons = {
				'prev': this.$el.find('#prev'),
				'next': this.$el.find('#next')
			};
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
			this.listEl.html('');
		},

		prevPage: function() {
			// console.log('prev-page');
			app.router.navigate('search/{0}/{1}'.fmt(this.term, this.page - 1), {
				trigger: true
			});
		},

		nextPage: function() {
			// console.log('next-page');
			app.router.navigate('search/{0}/{1}'.fmt(this.term, this.page + 1), {
				trigger: true
			});
		},

		setPageSelector: function(selector, activate) {
			// selector: either prev/next
			var classes = 'on-hover-link activable link-blue hover-underline';
			var $el = this.pageButtons[selector];
			$el[activate ? 'addClass' : 'removeClass'](classes);
		}

	});

	return VideoListView;

});
