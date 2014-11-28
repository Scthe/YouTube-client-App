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

		template: _.template(tmpl),

		events: {
			'click #channel-name': 'goToChannel'
		},

		initialize: function() {
			_.bindAll(this, 'render', 'goToChannel');
			// TODO use web component for video

			// TODO better loading icon
			var a = '<img src="../images/loaderb64.gif" class="block-center std-paddings width-25">';
			this.$el.html(a);
		},

		render: function() {
			if (this.model.get('publishedAt')) {
				var d = new Date(this.model.get('publishedAt'));
				var str = '{0} {1}, {2}'.fmt(months[d.getMonth()], d.getDate(), d.getFullYear());
				this.model.set('_publishedAtViewable', str);
			} else {
				this.model.set('_publishedAtViewable', '');
			}

			this.$el.html(this.template(this.model.toJSON()));

			return this;
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
