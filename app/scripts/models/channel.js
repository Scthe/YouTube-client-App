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
		}
	});

	return Channel;
});