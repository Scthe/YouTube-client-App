'use strict';
/*global app, Backbone, Store*/

app.Comments = Backbone.Collection.extend({
	model: app.Comment,
	localStorage: new Store('backbone-comments')
});
app.comments = new app.Comments();