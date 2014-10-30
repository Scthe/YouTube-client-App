define([
	'jquery',
	'underscore',
	'backbone',
	'../models/commentList',
	'views/commentListItemView'
], function($, _, Backbone, comments, CommentView) {

	'use strict';

	var CommentListView = Backbone.View.extend({
		el: '#video-comments', // TODO seems to not be working..
		el_: '#video-comments',

		initialize: function() {
			comments.on('add', this.addOne, this);
			comments.fetch();
		},

		render: function() {
			this.$el.empty();
			var that = this;
			comments.each(function(e) {
				that.addOne(e);
			});
			return this;
		},

		addOne: function(comment) {
			var view = new CommentView({
				model: comment
			});
			//this.$el.append(view.render().el);
			$(this.el_).append(view.render().el);
		}
	});

	return CommentListView;
});