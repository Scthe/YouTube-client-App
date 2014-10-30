define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/video'
], function($, _, Backbone, Store, Video) {

	'use strict';

	var VideoList = Backbone.Collection.extend({
		model: Video,
		localStorage: new Store('backbone-videos')
	});

	return new VideoList(); // TODO instantiate in app.js
});