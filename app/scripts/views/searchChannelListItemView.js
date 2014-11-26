define([
  'jquery',
  'underscore',
  'backbone',
  'services/favoriteChannelsService',
  'text!templates/searchChannelListView.tmpl.html'
], function($, _, Backbone, favoriteChannelsService, tmpl) {

  'use strict';

  var SearchChannelListItemView = Backbone.View.extend({
    tagName: 'li',

    events: {
      'click .action-good': 'addToFavorites',
      'click .action-bad': 'removeFromFavorites'
    },

    className: 'clearfix content-2-columns list-item-medium margin-bottom-small',

    template: _.template(tmpl),

    initialize: function() {
      _.bindAll(this, 'render', 'addToFavorites', 'removeFromFavorites');
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },

    addToFavorites: function() {
      favoriteChannelsService.add(this.model.get('name'));
    },

    removeFromFavorites: function() {
      favoriteChannelsService.remove(this.model.get('name'));
    }

  });

  return SearchChannelListItemView;
});
