define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/searchInput.tmpl.html'
], function($, _, Backbone, tmpl) {

	'use strict';
	/*global app */

	var SEARCHDELAY = 500;

	var SearchView = Backbone.View.extend({
		el: '#search-bar',

		template: _.template(tmpl),

		initialize: function() {
			_.bindAll(this, 'render', 'bindEventSources', 'onSearchResults',
				'getSearchText', 'actionSearchStart', 'actionSearchEnd');
			this.render();
		},

		render: function() {
			// console.log('render');
			// this.$el.html(this.template(this.model.toJSON()));
			// this.$el.html('hi !');

			this.$el.html(this.template());
			this.searchIcon = this.$el.find('#search-input-icon');
			this.searchLoadingIcon = this.$el.find('#search-loading');
			this.searchInput = this.$el.find('input');
			// console.log(this.searchIcon);
			// console.log(this.searchLoadingIcon);
			// console.log(this.searchInput);

			// after creating views bind event handlers to them
			this.bindEventSources();

			return this;
		},

		bindEventSources: function() {
			// Search check list:
			// * kick off search
			// * change title
			// * start/stop search spinner
			// * use general /search route, not /search/:term/:page
			// 
			// TODO after enter key it sends acion twice ! - detect this and filter out

			// model the event stream
			var searches = this.searchInput
				.asEventStream('keyup')
				.doAction(this.actionSearchStart)
				.debounce(SEARCHDELAY);

			var enterKeyStream = this.searchInput
				.asEventStream('keyup')
				.filter(isEnter);

			var searchES = searches.merge(enterKeyStream)
				.flatMapLatest(this.getSearchText);

			searchES.onValue(goToSearchPage);
			/*doAction(Search)*/
			/*doAction(actionSearchEnd)*/
		},

		onSearchResults: function() {
			this.actionSearchEnd();
		},

		getSearchText: function() {
			return this.searchInput.val();
		},

		actionSearchStart: function() {
			this.searchIcon.hide();
			this.searchLoadingIcon.show();
			return this;
		},

		actionSearchEnd: function() {
			this.searchIcon.show();
			this.searchLoadingIcon.hide();
			return this;
		}


	});

	return SearchView;

	function isEnter(e) {
		return e.keyCode === 13;
	}

	function goToSearchPage(term) {
		// do search
		app.router.navigate('search/{0}'.fmt(term), {
			trigger: true
		});
	}

});
