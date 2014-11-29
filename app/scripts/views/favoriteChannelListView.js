define([
	'jquery',
	'underscore',
	'backbone',
	'views/favoriteChannelListItemView',
	'text!templates/favoriteChannelList.tmpl.html'
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
			this.render();

			this.collection.on('invalid', function() {
				console.error('New channel error: ', arguments[1]);
			});
		},

		render: function() {
			var self = this;

			if (!this.viewCache) {
				// we have to use view cache so that we do not recreate
				// template again, which would reset the inputs
				this.viewCache = this.template();
				this.$el.html(this.viewCache);
				this.listEl = this.$('#channel-list');
				this.newChannelText = this.$('#add-channel-text');
				this.newChannelBtn = this.$('#add-channel-btn');

				// after creating views bind event handlers to them
				this.bindEventSources();
			} else {
				this.listEl.html('');
			}
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
			var self = this,
				clearInput = function() {
					self.newChannelText.val('');
				};


			// new 
			this.newChannelBtn
				.asEventStream('click')
				.map(getText)
				.doAction(clearInput)
				.onValue(addObject);

			// model the event stream
			var keysKeyStream = this.newChannelText
				.asEventStream('keyup')
				.debounce(PREVIEWDELAY)
				.flatMapLatest(getText);

			keysKeyStream.onValue(this.previewChannel);

			function getText() {
				return self.newChannelText.val();
			}

			function addObject(name) {
				Backbone.trigger('addFavoriteChannelByNameCmd', name);
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
