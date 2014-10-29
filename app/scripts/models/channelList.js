'use strict';
/*global app, Backbone, Store*/

app.ChannelList = Backbone.Collection.extend({
	model: app.Channel,
	localStorage: new Store('backbone-channels')
});
app.channelList = new app.ChannelList();