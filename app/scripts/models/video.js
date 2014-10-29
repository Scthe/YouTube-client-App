'use strict';
/*global app, Backbone*/
/*jshint camelcase: false */

app.Video = Backbone.Model.extend({
	//urlRoot: '/'
	defaults: {
		// youTube data
		youTube_id: '',
		youTube_channel_id: '',
		youTube_embed_Html: '',
		thumbnail: '',
		
		// base data
		name: '', // title
		user: '', // channel id
		created_on: undefined,
		created_on_date: undefined,
		
		// details
		view_count: '0',
		time: '0', // duration
		description: ''
		// dimension,
		// definition,
		// youTube comments ?
	},

	initialize: function() {}

});
