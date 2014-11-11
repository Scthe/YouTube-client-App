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
			_.bindAll(this, 'renderVideo', 'resetVideoList', 'render',
				'prevPage', 'nextPage', 'setPageSelector', 'onSearchResults');

			this.term = term;
			this.page = page;

			this.videoList = new VideoList();

			this.videoList.on('add', this.renderVideo, this);
			this.videoList.on('reset', this.resetVideoList, this);
			// this.videoList.fetch();

			this.render();
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		},

		renderVideo: function(video) {
			var view = new VideoListItemView({
				model: video,
				parent: this
			});
			this.listEl = $('#main-panel-content #video-list'); // TODO cache selector
			this.listEl.append(view.render().el);
		},

		resetVideoList: function() {
			this.listEl.html('');
		},

		prevPage: function() {
			app.router.navigate('search/{0}/{1}'.fmt(this.term, this.page - 1), {
				trigger: true
			});
		},

		nextPage: function() {
			app.router.navigate('search/{0}/{1}'.fmt(this.term, this.page + 1), {
				trigger: true
			});
		},

		setPageSelector: function(selector, activate) {
			// selector: either prev/next
			var classes = 'on-hover-link activable link-blue hover-underline';
			var $el = $('#main-panel-content #' + selector);
			$el[activate ? 'addClass' : 'removeClass'](classes); // TODO cache selector
		},

		onSearchResults: function(items) {
			/*jshint camelcase: false */
			console.log('Search returned with ' + items.length + ' elements');
			var self = this;

			$.each(items, function(i, e) {
				self.videoList.create({
					name: e.snippet.title,
					user: e.snippet.channelTitle,
					time: '2:41', // TODO hardcoded
					view_count: '502', // TODO hardcoded
					thumbnail: e.snippet.thumbnails['default'].url,
					created_on: e.snippet.publishedAt,
					youTube_id: e.id.videoId // TODO when the search result is a channel this will be undefined
				});
			});
			//videoList.localStorage.save();

			this.setPageSelector('prev', this.page !== 1);
			this.setPageSelector('next', true);

			var seachLoading = $('#search-loading'), // TODO cache selector
				searchInputIcon = $('#search-input-icon');
			searchInputIcon.show();
			seachLoading.hide();
		}

	});

	return VideoListView;

});
