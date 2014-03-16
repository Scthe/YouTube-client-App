app.Video = Backbone.Model.extend({
	//urlRoot: '/'
	defaults: {
		// youTube data
		youTube_id:"",
		youTube_channel_id:"",
		youTube_embed_Html:"",
		thumbnail: "",
		// base data
		name: '', // title
		user: "", // channel id
		created_on: undefined,
		created_on_date: undefined,
		// details
		view_count:"0",
		time:"0", // duration
		description:""
		// dimension,
		// definition,
		// youTube comments ?
	},
	
	initialize:function(){}
	
});

app.VideoList = Backbone.Collection.extend({
	model: app.Video,
	localStorage: new Store("backbone-videos")
});
app.videoList = new app.VideoList();

//
// Comments
//
app.Comment = Backbone.Model.extend({
	//urlRoot: '/'
	defaults: {
		author: 'Android Developers',
		avatar: 'imgs/avatar2.jpg',
		created_at: '11-03-2013',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare libero odio, quis dapibus elit vehicula vel. Pellentesque aliquet nec eros quis pellentesque. Etiam placerat iaculis purus, in ullamcorper elit iaculis non. Vivamus volutpat tristique massa quis commodo. Sed eget lectus at elit cursus vestibulum. Nulla consectetur, turpis sit amet mollis feugiat, enim sem dapibus dui, vel feugiat sapien tellus vitae sapien.'
	}
});

app.Comments = Backbone.Collection.extend({
	model: app.Comment,
	localStorage: new Store("backbone-comments")
});
app.comments = new app.Comments();