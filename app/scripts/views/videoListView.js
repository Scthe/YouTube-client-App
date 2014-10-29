'use strict';
/*global app, Backbone, Settings, _*/

app.VideoListView = Backbone.View.extend({
	el: '#main-panel-content',

	initialize: function() {
		_.bindAll(this, 'onAdd', 'resetAll', 'render');
		app.videoList.on('add', this.onAdd, this);
		app.videoList.on('reset', this.resetAll, this);
		app.videoList.fetch();
	},

	render: function() {
		if (Settings.get('debug')) {
			console.log('VIEW VideoListView render: ' + app.videoList.length);
		}
		this.$el.html('');
		var that = this;
		app.videoList.each(function(e) {
			that.onAdd(e);
		});
	},

	onAdd: function(video) {
		// TODO sort A-Z ?
		// TODO ensure only 1 is active at a time ?
		var view = new app.VideoCardItemView({
			model: video,
			parent: this
		});
		this.$el.append(view.render().el);
	},

	resetAll: function() {
		this.$el.html('');
	}
});
app.videoListView = new app.VideoListView();