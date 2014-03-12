Settings = {
	"_default": {
		//"version":"0"
		"debug": true
	},

	"setup": function () {
		console.log("settings setup");
	},

	"get": function (name) {
		return Settings._default[name];
	}
}
Settings.setup();


// models
var app = {}; // app namespace
app.Comment = Backbone.Model.extend({
	//urlRoot: '/'
	defaults: {
		author: 'Android Developers',
		avatar: 'imgs/avatar2.jpg',
		created_at: '11-03-2013',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare libero odio, quis dapibus elit vehicula vel. Pellentesque aliquet nec eros quis pellentesque. Etiam placerat iaculis purus, in ullamcorper elit iaculis non. Vivamus volutpat tristique massa quis commodo. Sed eget lectus at elit cursus vestibulum. Nulla consectetur, turpis sit amet mollis feugiat, enim sem dapibus dui, vel feugiat sapien tellus vitae sapien.'
	}
});

app.Comments = Backbone.Collection.extend({
	model: app.Comment,
	localStorage: new Store("backbone-comments")
});
app.comments = new app.Comments();
// app.comments.on('add', this.addAll, this);

// views
var TestView = Backbone.View.extend({
	el: '#main-panel-content',

	events: {
		'click .video-comment-name': 'name_click_callback'
	},

	initialize: function () {
		console.log("init");
		_.bindAll(this, 'render'); // remember: every function that uses 'this' as the current object should be in here
		//this.render();
	},

	render: function () {
		console.log("TestView-render");
		//this.$el.html("<span id=\"aa\">aaa</span>" + this.$el.html());
		this.$el.html("<span id=\"aa\">aaa</span>");
	},
	
	name_click_callback: function (ev) {
		console.log("click");
		//router.navigate('b', {
		//	trigger: true
		//});
	}
});
var testView = new TestView();

app.CommentView = Backbone.View.extend({
	//el: '#video-comments',

	tagname: 'li',

	template: _.template($("#comment-template").html()),

	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});

app.CommentListView = Backbone.View.extend({
	el: "#video-comments",

	initialize: function () {
		app.comments.on('add', this.addOne, this);
		app.comments.fetch();
	},

	addOne: function (comment) {
		var view = new app.CommentView({
			model: comment
		});
		this.$el.append(view.render().el);
	}
});
app.commentsListView = new app.CommentListView();

// routing
var Router = Backbone.Router.extend({
	routes: {
		"": "home",
		"b": "b",
		"c/:id": "c"
	}
});

app.router = new Router;
app.router.on('route:home', function () {
	console.log("routed to home");
	testView.render();
})
app.router.on('route:c', function (id) {
//	userEditView.render({
//		id: id
//	});
})
Backbone.history.start();


$("#add_comment").click(function () {
	app.comments.create(app.Comment.defaults);
});

$("#brand").click(function () {
	console.log("home");
	app.router.navigate('', {
		trigger: true
	});
});