define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {

	'use strict';

	var CommentView = Backbone.View.extend({
		tagName: 'li',

		className: 'comment-text hide-overflow video-comment',

		template: _.template($('#comment-template').html()),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return CommentView;
});