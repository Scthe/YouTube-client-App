//
// Comments
//
app.CommentView = Backbone.View.extend({
	tagName: 'li',

	template: _.template($("#comment-template").html()),

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

app.CommentListView = Backbone.View.extend({
	el: "#video-comments", // TODO seems to not be working..
	el_: "#video-comments",

	initialize: function () {
		app.comments.on('add', this.addOne, this);
		app.comments.fetch();
	},
	
	render: function () {
		this.$el.empty();
		var that = this;
		app.comments.each(function(e){that.addOne(e);});
		return this;
	},

	addOne: function (comment) {
		var view = new app.CommentView({
			model: comment
		});
		//this.$el.append(view.render().el);
		$(this.el_).append(view.render().el);
	}
});
app.commentsListView = new app.CommentListView();

//
// VideoView
//
app.VideoView = Backbone.View.extend({
	el: "#main-panel-content",

	events:{
		"click #add_comment":"add_comment"
	},
	
	template: _.template($("#video-template").html()),
	
	initialize: function (options) {
	},
	
	render: function () {
		//console.log(this.model);
		this.$el.html(this.template(this.model.toJSON()));
		app.commentsListView.render();
		return this;
	},
	
	setVideo:function( video){
		this.model = video;
	},
	
	add_comment:function(){
		console.log("adding new comment");
		app.comments.create(app.Comment.defaults);
	}
});
app.videoView = new app.VideoView();
