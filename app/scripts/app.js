define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/channelList',
	'views/searchInputView',
	'views/channelListView',
	'services/favoriteChannelsService'
], function($, _, Backbone, Router, ChannelList, SearchInputView, ChannelListView, FavoriteChannelsService) {
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

		window.localStorage.clear();

		// TODO use Backbone object as pub-sub

		// create always visible views
		app.searchView = new SearchInputView();
		app.channelListView = new ChannelListView({
			collection: FavoriteChannelsService.collection
		});

	}

	function setContent(content) {
		contentPanel.html(content);
	}

	function setViewTitle(str) {
		viewTitle.html(str);
	}

});
