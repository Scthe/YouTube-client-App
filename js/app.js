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
var Aaa = Backbone.Model.extend({
	urlRoot: '/'
});

// views
var TestView = Backbone.View.extend({
	el: '#main-panel-content',
	
	events: {
		'click #aa': 'fun1'
	},
	
	fun1: function (ev) {
		console.log("click");
		router.navigate('b', {
			trigger: true
		});
	},
	
	initialize: function () {
		console.log("init");
		this.render();
	},
	
	render: function () {
		console.log("render");
		this.$el.html("<span id=\"aa\">aaa</span>");
	}
});
var testView = new TestView();

var TestView2 = Backbone.View.extend({
	el: '#main-panel-content',
	
	initialize: function () {
		console.log("init2");
		this.render();
	},
	
	render: function () {
		console.log("render2");
		this.$el.html("<span id=\"bb\">bbb</span>");
	}
});
var testView2 = new TestView2();

// routing
var Router = Backbone.Router.extend({
	routes: {
		"": "home",
		"b": "b",
		"c/:id": "c"
	}
});

var router = new Router;
router.on('route:a', function () {
	testView.render();
})
router.on('route:b', function () {
	testView2.render();
})
router.on('route:c', function (id) {
	userEditView.render({
		id: id
	});
})
Backbone.history.start();



























