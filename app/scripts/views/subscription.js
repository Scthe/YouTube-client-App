app.ChannelView = Backbone.View.extend({
	tagName: 'li',

	className:"navigation-panel-button",

	template: _.template($("#channel-template").html()),

	events:{
		'click': 'selectItem'
	},
	
	initialize: function (options) {
		this.on('click','selectItem');
		this.className += this.model.get("active")?" active":"";
		this.render();
		this.parent = options.parent;
		// as we are manipulating the className after _ensureElement we have
		// recalculate the class attribute
		// see more: http://stackoverflow.com/questions/18330877/set-dynamically-classname-on-backbone-view-render
		this.$el.attr('class', _.result(this, 'className'));
	},
	
	render: function () {
		// proceed with the render
		this.$el.html(this.template(this.model.toJSON()));
		if(this.model.get('active')){
            $(this.el).addClass('active');
		}else
			$(this.el).removeClass('active');
		return this;
	},
	
	selectItem: function(){
		//console.log("click: "+this.model.get("name"));
		app.router.navigate('channel/'+this.model.id, {
			trigger: true
		});
	}
	
});

app.ChannelListView = Backbone.View.extend({
	el: "#channels-panel",

	initialize: function () {
		app.channelList.on('add', this.onAdd, this);
		app.channelList.fetch();
		//this.render();
	},
	
	render: function () {
		if( Settings.get("debug"))
			console.log("VIEW ChannelListView render");
		this.$el.html("");
		var that = this;
		app.channelList.each(function(e){that.onAdd(e);});
	},

	onAdd: function (channel) {
		// TODO sort A-Z ?
		// TODO ensure only 1 is active at a time ?
		var view = new app.ChannelView({
			model: channel,
			parent:this
		});
		this.$el.append(view.render().el);
	}
});
app.channelListView = new app.ChannelListView();
