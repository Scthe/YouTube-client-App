/*jslint indent: 2 */

define([
  'jquery',
  'underscore',
  'backbone',
  'models/channelList',
  'views/searchChannelListItemView',
  'text!templates/paginatedListView.tmpl.html'
], function($, _, Backbone, ChannelList, SearchChannelListItemView, tmpl) {

  'use strict';
  // TODO in 90% the same as video list view - create pagination view to inherit from

  var SearchChannelView = Backbone.View.extend({
    el: '#main-panel-content',

    template: _.template(tmpl),

    events: {
      'click #prev.activable': 'prevPage',
      'click #next.activable': 'nextPage'
    },

    initialize: function() {
      _.bindAll(this, 'renderItem', 'resetList', 'render',
        'prevPage', 'nextPage', 'updatePaginationButtons');

      this.collection = new ChannelList();
      this.collection.on('add', this.renderItem, this);
      this.collection.on('reset', this.resetList, this);
    },

    render: function() {
      // console.log('render');

      this.$el.html(this.template());
      this.listEl = this.$el.find('#items-list');
      this.listEl.addClass('clearfix');
      this.pageButtons = {
        'prev': this.$el.find('#prev'),
        'next': this.$el.find('#next')
      };
      this.collection.each(this.renderItem);
      $('[data-toggle="tooltip"]').tooltip();

      return this;
    },

    renderItem: function(item) {
      var view = new SearchChannelListItemView({
        model: item,
        parent: this
      });
      this.listEl.append(view.render().el);
      // TODO possible error: if item added after render it will not show tooltip
      // solution: find [tooltip] here !
    },

    resetList: function() {
      if (this.listEl) { // TODO try to reuse views
        this.listEl.html('');
      }
    },

    prevPage: function() {
      console.log('prev-page');
      // this.videoList.fetchPrevPage(this.updatePaginationButtons);
    },

    nextPage: function() {
      console.log('next-page');
      // this.videoList.fetchNextPage(this.updatePaginationButtons);
    },

    updatePaginationButtons: function(hasPrevious, hasNext) {
      var self = this,
        classes = 'on-hover-link activable link-blue hover-underline';

      setPageSelector('prev', hasPrevious);
      setPageSelector('next', hasNext);

      function setPageSelector(selector, activate) {
        // console.log(selector, activate);
        var $el = self.pageButtons[selector];
        $el[activate ? 'addClass' : 'removeClass'](classes);
      }
    }

  });

  return SearchChannelView;

});
