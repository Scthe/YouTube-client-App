'use strict';

window.Settings = {
	'_default': {
		//'version':'0'
		'debug': true,
		'search_delay': 500
	},

	'get': function(name) {
		return Settings._default[name];
	}
};


var app = {
	config: Settings
}; // app namespace

//
// normal jQuery event callbacks register
//
$('#brand').click(function() {
	console.log('home');
	app.router.navigate('', {
		trigger: true
	});
});

var searchTimer = null;
$('#search-bar input').keyup(function() {
	// hide normal search icon
	if ($('#search-input-icon').is(':visible')) {
		$('#search-input-icon').hide();
	}

	var term = $(this).val();
	clearTimeout(searchTimer);
	// wait some time before firing up the callback
	searchTimer = setTimeout(function() {
		// do search
		app.router.navigate('search/' + term + '/1', {
			trigger: true
		});
	}, app.config.get('search_delay'));
});