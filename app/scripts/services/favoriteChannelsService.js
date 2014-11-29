define([
	'underscore',
	'backbone',
	'models/channel',
	'models/channelList',
	'services/YouTubeService'
], function(_, Backbone, Channel, ChannelList, ytService) {

	'use strict';

	var col = new ChannelList();
	col.comparator = 'name';
	col.sort();

	// read local storage
	var xs = col.localStorage.findAll();
	for (var i = 0; i < xs.length; i++) {
		col.create(xs[i]);
	}

	var obj = {
		collection: col,
		add: add,
		remove: remove
	};

	// add 
	Backbone.on('addFavoriteChannelByNameCmd', function(name) {
		ytService.getChannel(name, function(result) {
			// console.log(result);
			obj.add(new Channel(undefined, {
				validate: false,
				apiData: result
			}));
		});
	});

	return obj;

	function add(channel) {
		/*jshint validthis: true */
		// console.log('add: ' + channelName);
		var exists = this.collection.findWhere({
			name: channel.get('name')
		});
		if (exists === undefined) {
			this.collection.create(channel);
		}
	}

	function remove(channel) {
		/*jshint validthis: true */
		// console.log('rem: ' + channelName);
		var os = this.collection.where({
			name: channel.get('name')
		});
		if (os) {
			this.collection.remove(os);
			// we have to do this by hand so that
			// it will not remove the model from local storage
			var ids = _.pluck(os, 'id');
			col.localStorage.records = _.reject(col.localStorage.records, function(id) {
				return _.contains(ids, id);
			});
			col.localStorage.save();
		}
	}

});
