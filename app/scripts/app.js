define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/channelList',
	'views/searchInputView',
	'views/channelListView',
	'services/favoriteChannelsService'
], function($, _, Backbone, Router, ChannelList, SearchInputView, ChannelListView, favoriteChannelsService) {
	'use strict';


	var contentPanel = $('#main-panel-content'),
		viewTitle = $('#view-title-text');


	return {
		initialize: initialize
	};

	function initialize() {
		/*global app*/
		console.log('app initialize');

		window.app = {
			setContent: setContent,
			setViewTitle: setViewTitle
		};
		app.router = Router.initialize();

		// add possibility to go to the main page
		$('#brand').click(function() {
			app.router.navigate('', {
				trigger: true
			});
		});

		// window.localStorage.clear();



		// create always visible views
		new SearchInputView();
		var channelListView = new ChannelListView({
			collection: favoriteChannelsService.collection
		});

		// needed so that the favorite channels could become active when selected
		app.router.on('route', function(name, args) {
			// console.log('route |', name, '|', args)
			if (name === 'channel') {
				var id = args[0];
				favoriteChannelsService.collection.each(function(e) {
					e.set('active', e.get('id') === id);
				});
			} else {
				favoriteChannelsService.collection.deselectAll();
			}

			// rerender left subscription panel to show changes
			channelListView.render();
		});

	}

	function setContent(content) {
		contentPanel.html(content);
	}

	function setViewTitle(str) {
		viewTitle.html(str);
	}

});
