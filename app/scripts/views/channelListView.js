define([
	'jquery',
	'underscore',
	'backbone',
	'views/channelListItemView',
	'text!templates/channelListView.tmpl.html'
], function($, _, Backbone, ChannelView, tmpl) {

	'use strict';

	var PREVIEWDELAY = 500;

	// TODO add remove channel button

	var ChannelListView = Backbone.View.extend({
		el: '#channels-panel',

		template: _.template(tmpl),

		initialize: function() {
			_.bindAll(this, 'render', 'renderChannel', 'bindEventSources', 'previewChannel');

			this.collection.on('add', this.renderChannel, this);
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
				});

			// model the event stream
			var keysKeyStream = this.newChannelText
				.asEventStream('keyup')
				.debounce(PREVIEWDELAY);

			var enterKeyStream = this.newChannelText
				.asEventStream('keyup')
				.filter(isEnter);

			var eventStream = keysKeyStream.merge(enterKeyStream)
				.flatMapLatest(getText);

			eventStream.onValue(this.previewChannel);

			function getText() {
				return self.newChannelText.val();
			}
		},

		previewChannel: function(ch) {
			if (ch.trim().length < 1) {
				return;
			}

			console.log('preview:', ch);
		}
	});

	return ChannelListView;

	function isEnter(e) { // TODO same as in searchInputView
		return e.keyCode === 13;
	}
});
