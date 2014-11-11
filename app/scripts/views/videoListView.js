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
			this.videoList.fetch_(term, page, function() { // kick off search
				self.setPageSelector('prev', self.page !== 1);
				self.setPageSelector('next', true);
			});

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
		}

	});

	return VideoListView;

});
