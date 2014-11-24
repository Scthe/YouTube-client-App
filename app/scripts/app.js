define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'models/channelList',
	'views/searchInputView',
	'views/channelListView',
], function($, _, Backbone, Router, ChannelList, SearchInputView, ChannelListView) {
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

		// create global accessible models
		app.channelList = new ChannelList();

		// create always visible views
		app.searchView = new SearchInputView();
		app.channelListView = new ChannelListView({
			collection: app.channelList
		});

	}

	function setContent(content) {
		contentPanel.html(content);
	}

	function setViewTitle(str) {
		viewTitle.html(str);
	}

});
