define([
	'jquery',
	'underscore',
	'backbone',
	'models/comment',
	'models/commentList',
	'models/video',
	'text!templates/videoView.tmpl.html'
], function($, _, Backbone, Comment, comments, Video, tmpl) {

	'use strict';
	/*global app */

	var monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
		'July', 'August', 'September', 'October', 'November', 'December'
	];

	var VideoView = Backbone.View.extend({
		el: '#main-panel-content',

		// events: {
		// 'click #add_comment': 'addComment'
		// },

		template: _.template(tmpl),

		initialize: function(youTubeId) {
			_.bindAll(this, 'render', 'onVideoGetSuccess', 'onVideoGetFail');

			// TODO better loading icon
			var a = '<img src="../images/loaderb64.gif" class="block-center std-paddings width-25">';
			this.$el.html(a);

			// create model
			this.model = new Video(youTubeId, this.onVideoGetSuccess, this.onVideoGetFail);
		},

		render: function() {
			// TODO add original YT link to the view

			this.$el.html(this.template(this.model.toJSON()));

			// if (typeof(this.model.get('created_on')) !== undefined) {
			// var d = new Date(this.model.get('created_on'));
			// var dateHTML = '<span>' + d.getDate() + '</span><span>' + monthNames[d.getMonth()].substring(0, 3) + '</span>';
			// $('#video-date').html(dateHTML);
			// }
			//app.commentsListView.render();

			return this;
		},

		onVideoGetSuccess: function() {
			app.setViewTitle(this.model.get('title'));
			this.render();
		},

		onVideoGetFail: function() {
			app.setViewTitle('Error');
			var text = 'For some reason this video could not be displayed';
			var a = '<div class="alert alert-danger" role="alert">{0}</div>'.fmt(text);
			this.$el.html(a);
		}

		// addComment: function() {
		// console.log('adding new comment');
		// comments.create(Comment.defaults);
		// }

	});

	return VideoView;
});
