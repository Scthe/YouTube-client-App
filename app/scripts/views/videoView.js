define([
	'jquery',
	'underscore',
	'backbone',
	'models/video',
	'text!templates/videoView.tmpl.html'
], function($, _, Backbone, Video, tmpl) {

	'use strict';
	/*global app */

	var months = ['January', 'February', 'March',
		'April', 'May', 'June',
		'July', 'August', 'September',
		'October', 'November', 'December'
	];

	var VideoView = Backbone.View.extend({
		el: '#main-panel-content',

		// TODO after clicking on author should go to the channel view

		template: _.template(tmpl),

		events: {
			'click #channel-name': 'goToChannel'
		},

		initialize: function(youTubeId) {
			_.bindAll(this, 'render', 'onVideoGetSuccess', 'onVideoGetFail', 'goToChannel');
			// TODO use web component for video

			// TODO better loading icon
			var a = '<img src="../images/loaderb64.gif" class="block-center std-paddings width-25">';
			this.$el.html(a);

			// create model
			this.model = new Video(youTubeId, this.onVideoGetSuccess, this.onVideoGetFail);
		},

		render: function() {
			if (typeof(this.model.get('publishedAt')) !== undefined) {
				var d = new Date(this.model.get('publishedAt'));
				var str = '{0} {1}, {2}'.fmt(months[d.getMonth()], d.getDate(), d.getFullYear());
				this.model.set('_publishedAtViewable', str);
			}

			this.$el.html(this.template(this.model.toJSON()));

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
		},

		goToChannel: function() {
			/*global app*/
			app.router.navigate('channel/{0}'.fmt(this.model.get('channelId')), {
				trigger: true
			});
		}

	});

	return VideoView;
});
