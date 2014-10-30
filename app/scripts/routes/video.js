define([
	'underscore',
	'models/videoList',
	'controllers'
], function(_, videoList, ytService) {

	'use strict';
	/*global app*/

	return {
		initialize: initialize
	};


	function initialize(router) {
		router.on('route:video', function(id) {
			console.log('routed to video \'' + id + '\'');

			// find the selected model
			// ( due to 'app.videoList.reset()' resetting the _byId look up we have to do it by hand)
			var video = _.find(videoList.models, function(e) {
				return e && e.hasOwnProperty('id') && e.id === id;
			});

			if (video) {
				app.setViewTitle(video.get('name'));

				// call for more details
				ytService.videoDetails(video.get('youTube_id'));
			} else {
				// TODO on video look up error
				console.log('err!');
			}

		});
	}

});