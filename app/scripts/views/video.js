//
// Comments
//
app.CommentView = Backbone.View.extend({
	tagName: 'li',

	className: 'comment-text hide-overflow',

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
var monthNames = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ];
app.VideoView = Backbone.View.extend({
	el: "#main-panel-content",

	events:{
		"click #add_comment":"add_comment"
	},
	
	template: _.template($("#video-template").html()),
	
	initialize: function (options) {
	},
	
	render: function () {
		if(Settings.get("debug")){
			console.log("VIEW VideoView render:");
			//console.log(this.model);
		}
		this.$el.html(this.template(this.model.toJSON()));
		if(typeof(this.model.get("created_on")) != undefined){
			var d = new Date( this.model.get("created_on"));
			$("#video-date").html("<span>"+d.getDate()+"</span><span>"+monthNames[d.getMonth()].substring(0,3)+"</span>");
		}
		//app.commentsListView.render();
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
