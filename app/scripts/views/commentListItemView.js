'use strict';
/*global app, Backbone, _*/

app.CommentView = Backbone.View.extend({
	tagName: 'li',

	className: 'comment-text hide-overflow video-comment',

	template: _.template($('#comment-template').html()),

	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});