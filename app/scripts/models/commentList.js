define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/comment'
], function($, _, Backbone, Store, Comment) {

	'use strict';

	var CommentList = Backbone.Collection.extend({
		model: Comment,
		localStorage: new Store('backbone-comments')
	});

	return new CommentList(); // TODO instantiate in app.js
});
