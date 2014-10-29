'use strict';
/*global app, Backbone*/

app.CommentListView = Backbone.View.extend({
	el: '#video-comments', // TODO seems to not be working..
	el_: '#video-comments',

	initialize: function() {
		app.comments.on('add', this.addOne, this);
		app.comments.fetch();
	},

	render: function() {
		this.$el.empty();
		var that = this;
		app.comments.each(function(e) {
			that.addOne(e);
		});
		return this;
	},

	addOne: function(comment) {
		var view = new app.CommentView({
			model: comment
		});
		//this.$el.append(view.render().el);
		$(this.el_).append(view.render().el);
	}
});
app.commentsListView = new app.CommentListView();