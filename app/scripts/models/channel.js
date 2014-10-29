'use strict';
/*global app, Backbone */

app.Channel = Backbone.Model.extend({
	//urlRoot: '/'
	defaults: {
		name: 'Channel A',
		video_count: 3,
		active: false
	}
});
