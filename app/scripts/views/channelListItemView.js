define([
	'jquery',
	'underscore',
	'backbone',
	'services/favoriteChannelsService',
	'text!templates/channelListItem.tmpl.html'
], function($, _, Backbone, favoriteChannelsService, tmpl) {

	'use strict';

	var SearchChannelListItemView = Backbone.View.extend({
		tagName: 'li',

		events: {
			'click .action-good': 'addToFavorites',
			'click .action-bad': 'removeFromFavorites',
			'click .id-channel': 'goToChannel'
		},

		className: 'clearfix content-2-columns list-item-medium margin-bottom-small',

		template: _.template(tmpl),

		initialize: function() {
			_.bindAll(this, 'render', 'addToFavorites', 'removeFromFavorites', 'goToChannel');
			this.render();
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		addToFavorites: function() {
			favoriteChannelsService.add(this.model);
		},

		removeFromFavorites: function() {
			favoriteChannelsService.remove(this.model);
		},

		goToChannel: function() {
			/*global app*/
			app.router.navigate('channel/{0}'.fmt(this.model.get('id')), {
				trigger: true
			});
		}

	});

	return SearchChannelListItemView;
});
