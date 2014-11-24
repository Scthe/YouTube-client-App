define({
	initialize: function(router) {
		'use strict';
		/*global app*/

		router.on('route:home', function() {
			console.log('routed to home');

			app.setViewTitle('Home');
			app.setContent('home');
		});
	}
});