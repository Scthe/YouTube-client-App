'use strict';
/*global app, Backbone*/

app.Comment = Backbone.Model.extend({
	//urlRoot: '/'
	defaults: {
		author: 'Android Developers',
		avatar: 'imgs/avatar2.jpg',
		createdAt: '11-03-2013',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare libero odio, quis dapibus elit vehicula vel. Pellentesque aliquet nec eros quis pellentesque. Etiam placerat iaculis purus, in ullamcorper elit iaculis non. Vivamus volutpat tristique massa quis commodo. Sed eget lectus at elit cursus vestibulum. Nulla consectetur, turpis sit amet mollis feugiat, enim sem dapibus dui, vel feugiat sapien tellus vitae sapien.'
	}
});
