define([
	'jquery',
	'underscore',
	'backbone',
], function($, _, Backbone) {

	'use strict';

	var Channel = Backbone.Model.extend({
		//urlRoot: '/'
		defaults: {
			name: '',
			videoCount: 0,
			active: false
		},

		validate: function(attrs) {
			if (!attrs.name || attrs.name.trim().length < 1) {
				return 'Incorrect name';
			}
		}

	});

	return Channel;
});
