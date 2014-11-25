define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/searchChannelListView.tmpl.html'
], function($, _, Backbone, tmpl) {

  'use strict';

  var SearchChannelListItemView = Backbone.View.extend({
    tagName: 'li',

    className: 'clearfix content-2-columns list-item-medium margin-bottom-small',

    template: _.template(tmpl),

    initialize: function() {
      _.bindAll(this, 'render', 'goToVideo');
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });

  return SearchChannelListItemView;
});
