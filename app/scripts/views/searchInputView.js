define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/searchInput.tmpl.html'
], function($, _, Backbone, tmpl) {

	'use strict';

	// Search check list:
	// * kick off search
	// * change title
	// * start/stop search spinner
	// * use general /search route, not /search/:term/:page


	var SEARCHDELAY = 500;

	var SearchView = Backbone.View.extend({
		el: '#search-bar',

		template: _.template(tmpl),

		initialize: function() {
			_.bindAll(this, 'render', 'bindEventSources',
				'onSearchEnd', 'goToSearchPage');
			this.lastSearch = '';
			this.render();

			Backbone.on('searchFinishedEvent', this.onSearchEnd);
		},

		render: function() {
			this.$el.html(this.template());
			this.searchIcon = this.$el.find('#search-input-icon');
			this.searchLoadingIcon = this.$el.find('#search-loading');
			this.searchInput = this.$el.find('input');

			// after creating views bind event handlers to them
			this.bindEventSources();

			return this;
		},

		bindEventSources: function() {
			var self = this,
				hideSearchIcon = this.searchIcon.hide.bind(this.searchIcon),
				showSearchLoadingIcon = this.searchLoadingIcon.show.bind(this.searchLoadingIcon);

			// model the event stream
			var searches = this.searchInput
				.asEventStream('keyup')
				.doAction(hideSearchIcon)
				.doAction(showSearchLoadingIcon)
				.debounce(SEARCHDELAY);

			var enterKeyStream = this.searchInput
				.asEventStream('keyup')
				.filter(isEnter);

			var searchES = searches.merge(enterKeyStream)
				.flatMapLatest(getSearchText);

			searchES.onValue(this.goToSearchPage);

			function getSearchText() {
				return self.searchInput.val();
			}
		},

		onSearchEnd: function(term) {
			if (this.lastSearch === term) {
				this.searchIcon.show();
				this.searchLoadingIcon.hide();
			}
			return this;
		},

		goToSearchPage: function(term) {
			/*global app*/
			// do search
			if (term.trim().length === 0) {
				this.onSearchEnd(this.lastSearch);
			} else if (this.lastSearch !== term) {
				this.lastSearch = term;
				app.router.navigate('search/video/{0}'.fmt(term), {
					trigger: true
				});
			}
		}


	});

	return SearchView;


	function isEnter(e) {
		return e.keyCode === 13;
	}

});
