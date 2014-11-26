define([
	'models/channelList'
], function(ChannelList) {

	'use strict';

	var col = new ChannelList();
	// col.comparator = 'name';
	col.comparator = function(e) {
		return e.get('name');
	};
	col.sort();
	// col.on('sort', onUpdate.bind(undefined, col));

	return {
		collection: col,
		add: add,
		remove: remove,
		onUpdate: onUpdate
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
			o = this.collection.findWhere(obj);
		if (o !== undefined) {
			this.collection.remove(o);
		}
	}

	function onUpdate(/*col*/) {
		/* jshint -W040 */
		// TODO ensure only 1 is active at a time ?
		// console.log('update !');
	}

});
