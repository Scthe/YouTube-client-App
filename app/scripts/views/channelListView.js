'use strict';
/*global app, Backbone*/

app.ChannelListView = Backbone.View.extend({
	el: '#channels-panel',

	initialize: function() {
		app.channelList.on('add', this.onAdd, this);
		app.channelList.fetch();
		//this.render();
	},

	render: function() {
		this.$el.html('');
		var that = this;
		app.channelList.each(function(e) {
			that.onAdd(e);
		});
	},

	onAdd: function(channel) {
		// TODO sort A-Z ?
		// TODO ensure only 1 is active at a time ?
		var view = new app.ChannelView({
			model: channel,
			parent: this
		});
		this.$el.append(view.render().el);
	}
});
app.channelListView = new app.ChannelListView();