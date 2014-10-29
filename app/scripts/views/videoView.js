'use strict';
/*global app, Backbone, _, Settings*/

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];
app.VideoView = Backbone.View.extend({
	el: '#main-panel-content',

	events: {
		'click #add_comment': 'add_comment'
	},

	template: _.template($('#video-template').html()),

	initialize: function() {},

	render: function() {
		if (Settings.get('debug')) {
			console.log('VIEW VideoView render:');
			//console.log(this.model);
		}
		this.$el.html(this.template(this.model.toJSON()));
		if (typeof(this.model.get('created_on')) !== undefined) {
			var d = new Date(this.model.get('created_on'));
			$('#video-date').html('<span>' + d.getDate() + '</span><span>' + monthNames[d.getMonth()].substring(0, 3) + '</span>');
		}
		//app.commentsListView.render();
		return this;
	},

	setVideo: function(video) {
		this.model = video;
	},

	add_comment: function() {
		console.log('adding new comment');
		app.comments.create(app.Comment.defaults);
	}
});
app.videoView = new app.VideoView();