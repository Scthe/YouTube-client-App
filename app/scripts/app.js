define([
	'jquery',
	'underscore',
	'backbone',
	'router'
], function($, _, Backbone, Router) {
	'use strict';

	var settings = { // TODO separate setting into own file
		_default: {
			//'version':'0'
			'debug': true,
			'search_delay': 500
		},

		get: function(name) {
			return settings._default[name];
		}
	};


	return {
		config: settings,
		initialize: initialize
	};

	function initialize() {
		/*global app*/
		console.log('app initialize');

		var router = Router.initialize();

		window.app = {
			router: router
		};

		// jQuery event callbacks register
		$('#brand').click(function() {
			console.log('home');
			app.router.navigate('', {
				trigger: true
			});
		});

		// TODO create search controller
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
			}, settings.get('search_delay'));
		});
	}

});