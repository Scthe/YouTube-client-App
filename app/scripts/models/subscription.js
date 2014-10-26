app.Channel = Backbone.Model.extend({
	//urlRoot: '/'
	defaults: {
		name: 'Channel A',
		video_count: 3,
		active: false
	}
});

app.ChannelList = Backbone.Collection.extend({
	model: app.Channel,
	localStorage: new Store("backbone-channels")
});
app.channelList = new app.ChannelList();
