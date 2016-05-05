define([
	"coreJS/adapt"
], function(Adapt) {

	var postRenderEvent = ["article", "block", "component"].join("View:postRender ")+"View:postRender";
	var managedViews = [];

	Adapt.on(postRenderEvent, function(view) {
		var model = view.model;
		var hideOn = model.get("_hideOn");
		
		if (!hideOn) return;

		managedViews.push(view);

		checkState(view);
	});

	Adapt.on("pageView:ready", function() {
		checkStates();
	});

	Adapt.on("device:changed", checkStates);

	Adapt.on("remove", function() {
		managedViews.length = 0;
	});

	function checkStates() {
		if (managedViews.length === 0) return;

		for (var i = 0, l = managedViews.length; i < l; i++) {
			checkState(managedViews[i]);
		}

		Adapt.trigger("pageLevelProgress:update");
	}

	function checkState(view) {
		var model = view.model;
		var screenSize = Adapt.device.screenSize;
		var hideOn = model.get("_hideOn");
		var isHidden = hideOn.indexOf(screenSize) > -1;

		if (isHidden) {
			model.set({
				"_isAvailable": false
			});
			view.$el.addClass("display-none");
		} else {
			model.set({
				"_isAvailable": true
			});
			view.$el.removeClass("display-none");
		}
	}

});
