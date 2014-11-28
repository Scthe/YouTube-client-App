define([
	'underscore',
	'models/channelList'
], function(_, ChannelList) {

	'use strict';

	var col = new ChannelList();
	col.comparator = 'name';
	col.sort();

	// read local storage
	var xs = col.localStorage.findAll();
	for (var i = 0; i < xs.length; i++) {
		col.create(xs[i]);
	}

	return {
		collection: col,
		add: add,
		remove: remove
	};

	function add(channelName) {
		/* jshint -W040 */
		// console.log('add: ' + channelName);
		var obj = {
				name: channelName
			},
			exists = this.collection.findWhere(obj);
		if (exists === undefined) {
			this.collection.create(obj);
		}
	}

	function remove(channelName) {
		/* jshint -W040 */
		// console.log('rem: ' + channelName);
		var obj = {
				name: channelName
			},
			os = this.collection.where(obj);
		if (os) {
			this.collection.remove(os);
			var ids = _.pluck(os, 'id');
			// we have to do this by hand so that
			// it will not remove the model from local storage
			col.localStorage.records = _.reject(col.localStorage.records, function(id) {
				return _.contains(ids, id);
			});
			col.localStorage.save();
		}
	}

	// TODO ensure only 1 is active at a time ?

});
