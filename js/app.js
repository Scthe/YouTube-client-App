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


var app = {}; // app namespace
app.log = function( t){}

// app.comments.on('add', this.addAll, this);
// TODO _.bindAll(this, 'render'); // remember: every function that uses 'this' as the current object should be in here

//
// normal jQuery event callbacks register
//
$("#brand").click(function () {
	console.log("home");
	app.router.navigate('', {
		trigger: true
	});
});