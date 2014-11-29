define([
	'jquery',
	'underscore',
	'backbone',
	'backboneLocalStorage',
	'models/video',
	'models/apiSearchable'
], function($, _, Backbone, Store, Video, ApiSearchable) {

	'use strict';

	var VideoList = Backbone.Collection.extend({

		model: Video,

		localStorage: new Store('backbone-videos'),

		MAXRESULTS: 12,

		initialize: function() {
			_.bindAll(this, 'initialize_');
			this.initialize_();
		}

	});

	VideoList.prototype = _.extend(VideoList.prototype, ApiSearchable);

	return VideoList;
});
