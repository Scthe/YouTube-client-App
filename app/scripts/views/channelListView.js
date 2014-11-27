define([
	'jquery',
	'underscore',
	'backbone',
	'views/channelListItemView',
	'text!templates/channelListView.tmpl.html'
], function($, _, Backbone, ChannelView, tmpl) {

	'use strict';

	var PREVIEWDELAY = 500;

	var ChannelListView = Backbone.View.extend({
		el: '#channels-panel',

		template: _.template(tmpl),

		initialize: function() {
			_.bindAll(this, 'render', 'renderChannel', 'bindEventSources', 'previewChannel');

			this.lastSearch = '';
			this.collection.on('add', this.render, this);
			this.collection.on('remove', this.render, this);
			// this.collection.on('sort', this.render, this);
			this.render();

			this.collection.on('invalid', function() {
				console.error('New channel error: ', arguments[1]);
			});
		},

		render: function() {
			var self = this;

			this.$el.html(this.template());
			this.listEl = this.$el.find('#channel-list');
			this.newChannelText = this.$el.find('#add-channel-text');
			this.newChannelBtn = this.$el.find('#add-channel-btn');

			// after creating views bind event handlers to them
			this.bindEventSources();

			// render items
			this.collection.each(self.renderChannel);
		},

		renderChannel: function(channel) {
			var view = new ChannelView({
				model: channel,
				parent: this
			});
			this.listEl.append(view.render().el);
		},

		bindEventSources: function() {
			var self = this;

			this.newChannelBtn
				.asEventStream('click')
				.map(getText)
				.onValue(function(e) {
					// console.log(e);
					self.collection.add({
						name: e
					}, {
						validate: true
					});
					self.newChannelText.val('');
				});

			// model the event stream
			var keysKeyStream = this.newChannelText
				.asEventStream('keyup')
				.debounce(PREVIEWDELAY)
				.flatMapLatest(getText);

			keysKeyStream.onValue(this.previewChannel);

			function getText() {
				return self.newChannelText.val();
			}
		},

		previewChannel: function(term) {
			// do search
			if (term.trim().length > 0 && this.lastSearch !== term) {
				// console.log('preview:', term);
				this.lastSearch = term;
				app.router.navigate('search/channel/{0}'.fmt(term), {
					trigger: true
				});
			}
		}
	});

	return ChannelListView;

});
