'use strict';
/*global app, Backbone, _*/

var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December'
];
app.VideoView = Backbone.View.extend({
	el: '#main-panel-content',

	events: {
		'click #add_comment': 'addComment'
	},

	template: _.template($('#video-template').html()),

	initialize: function() {},

	render: function() {
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

	addComment: function() {
		console.log('adding new comment');
		app.comments.create(app.Comment.defaults);
	}
});
app.videoView = new app.VideoView();