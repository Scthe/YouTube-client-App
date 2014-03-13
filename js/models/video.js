app.Video = Backbone.Model.extend({
	//urlRoot: '/'
	defaults: {
		name: 'This Week in Android Development',
		thumbnail: "imgs/img6.jpg",
		created_on: "17th dec",
		user: "Android Developers",
		view_count:"10224",
		time:"1:43"
	}
});

app.VideoList = Backbone.Collection.extend({
	model: app.Video,
	localStorage: new Store("backbone-videos")
});
app.videoList = new app.VideoList();
