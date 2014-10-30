define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/comment.tmpl.html'
], function($, _, Backbone, tmpl) {

	'use strict';

	var CommentView = Backbone.View.extend({
		tagName: 'li',

		className: 'comment-text hide-overflow video-comment',

		template: _.template(tmpl),

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});

	return CommentView;
});