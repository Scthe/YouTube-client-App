define([
	'jquery',
	'underscore',
	'backbone',
	'router',
	'views/searchInputView'
], function($, _, Backbone, Router, SearchInputView) {
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

		// create search view
		app.searchView = new SearchInputView();
	}

	function setContent(content) {
		contentPanel.html(content);
	}

	function setViewTitle(str) {
		viewTitle.html(str);
	}

});
