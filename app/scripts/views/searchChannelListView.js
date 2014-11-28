/*jslint indent: 2 */

define([
  'jquery',
  'underscore',
  'backbone',
  'models/channelList',
  'views/searchChannelListItemView',
  'views/paginatedListView'
], function($, _, Backbone, ChannelList, SearchChannelListItemView, PaginatedListView) {

  'use strict';

  var SearchChannelView = PaginatedListView.extend({
    el: '#main-panel-content',

    listElClass: 'clearfix',

    onInitialize: function() {
      this.collection = new ChannelList();
    },

    renderItem: function(item) {
      var view = new SearchChannelListItemView({
        model: item,
        parent: this
      }).render();
      this.listEl.append(view.el);
      view.$el.find('[data-toggle="tooltip"]').tooltip();
    }

  });

  return SearchChannelView;

});
