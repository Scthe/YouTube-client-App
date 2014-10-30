define([
  'jquery',
  'underscore',
  'backbone',
  'requirejsText', // TODO ?!
  'text!templates/channelListItem.tmpl.html'
], function($, _, Backbone,te, tmpl) {

  'use strict';

  var ChannelView = Backbone.View.extend({
    tagName: 'li',

    className: 'state-button activable text-white',

    template: _.template(tmpl),

    events: {
      // 'click': 'selectItem' // TODO restore
    },

    initialize: function(options) {
      //this.on('click', 'selectItem'); // TODO restore
      this.className += this.model.get('active') ? ' active' : '';
      this.render();
      this.parent = options.parent;
      // as we are manipulating the className after _ensureElement we have
      // recalculate the class attribute
      // see more: http://stackoverflow.com/questions/18330877/set-dynamically-classname-on-backbone-view-render
      this.$el.attr('class', _.result(this, 'className'));
    },

    render: function() {
      // proceed with the render
      this.$el.html(this.template(this.model.toJSON()));
      if (this.model.get('active')) {
        $(this.el).addClass('active');
      } else {
        $(this.el).removeClass('active');
      }
      return this;
    },

    selectItem: function() {
      //console.log("click: "+this.model.get("name"));
      app.router.navigate('channel/' + this.model.id, {
        trigger: true
      });
    }

  });

  return ChannelView;

});