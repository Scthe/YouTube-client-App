define({
	initialize: function(router) {
		'use strict';
		/*global app*/

		// TODO add general content here

		router.on('route:home', function() {
			console.log('routed to home');

			app.setViewTitle('Home', 'home');
		});
	}
});
