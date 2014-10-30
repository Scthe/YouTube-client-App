define({
	initialize: function(router, channelListView) {
		'use strict';
		/*global app*/

		router.on('route:home', function() {
			console.log('routed to home');

			// render left subscription panel
			channelListView.render();

			app.setViewTitle('Home');
			app.setContent('home');
		});
	}
});