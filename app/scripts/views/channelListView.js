/*jslint indent: 2 */

define([
  'jquery',
  'underscore',
  'backbone',
  'models/channelList',
  'views/channelListItemView',
  'views/paginatedListView'
], function($, _, Backbone, ChannelList, SearchChannelListItemView, PaginatedListView) {

  'use strict';

  var SearchChannelView = PaginatedListView.extend({
    el: '#main-panel-content',

    listElClass: 'clearfix',

    viewIcon: 'th',

    onInitialize: function() {
      this.collection = new ChannelList();
    },

    renderItem: function(item) {
      var view = new SearchChannelListItemView({
        model: item
      }).render();
      view.$el.find('[data-toggle="tooltip"]').tooltip();
      return view;
    }

  });

  return SearchChannelView;

});
