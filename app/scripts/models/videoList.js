'use strict';
/*global app, Backbone, Store*/

app.VideoList = Backbone.Collection.extend({
	model: app.Video,
	localStorage: new Store('backbone-videos')
});
app.videoList = new app.VideoList();
