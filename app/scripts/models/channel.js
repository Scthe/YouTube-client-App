define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {

	'use strict';

	var Channel = Backbone.Model.extend({
		//urlRoot: '/'
		defaults: {
			name: 'Channel A',
			videoCount: 3,
			active: false
		}
	});

	return Channel;
});