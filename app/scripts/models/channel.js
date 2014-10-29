'use strict';
/*global app, Backbone */

app.Channel = Backbone.Model.extend({
	//urlRoot: '/'
	defaults: {
		name: 'Channel A',
		videoCount: 3,
		active: false
	}
});
