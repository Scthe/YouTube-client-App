app.VideoCardItemView = Backbone.View.extend({
	tagName: 'article',

	className:"card video-card",

	template: _.template($("#video-card-template").html()),

	events:{
		'click .video-card-thumb': 'goToVideo',
		'click .video-card-title': 'goToVideo'
	},
	
	initialize: function (options) {
		this.render();
	},
	
	render: function () {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	
	goToVideo:function(){
		app.router.navigate('video/'+this.model.id, {
			trigger: true
		});
	}
});

app.VideoListView = Backbone.View.extend({
	el: "#main-panel-content",

	initialize: function () {
		 _.bindAll(this, 'onAdd', 'resetAll', 'render');
		app.videoList.on('add', this.onAdd, this);
		app.videoList.on('reset', this.resetAll, this);
		app.videoList.fetch();
		this.render();
	},
	
	render: function () {
		this.$el.html("");
		var that = this;
		app.videoList.each(function(e){that.onAdd(e);});
	},

	onAdd: function (video) {
		// TODO sort A-Z ?
		// TODO ensure only 1 is active at a time ?
		var view = new app.VideoCardItemView({
			model: video,
			parent:this
		});
		this.$el.append(view.render().el);
	},
	
	resetAll: function (){
		this.$el.html("");
	}
});
app.videoListView = new app.VideoListView();
