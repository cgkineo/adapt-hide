define([
    "core/js/adapt"
], function(Adapt) {

    var Hide = Backbone.Controller.extend({

        postRenderEvent: ["article", "block", "component", ""].join("View:postRender "),
        managedViews: [],
        $html: null,

        initialize: function() {
            $(function() {
                this.$html = $("html");
            }.bind(this))

            this.listenTo(Adapt, this.postRenderEvent, this.onPostRender);
            this.listenTo(Adapt, {
                "pageView:ready": this.onPageReady,
                "device:changed": this.checkStates
            });

            _.bindAll(this, "triggerResize");
            this.triggerResize = _.debounce(this.triggerResize, 250);
        },

        onPostRender: function(view) {
            var model = view.model;
            var config = model.get("_hide");

            if (!config || !config._isEnabled) return;
            
            this.managedViews.push(view);
            this.checkState(view);
        },

        checkState: function(view) {
            var model = view.model;
            var config = model.get("_hide");

            if (!config._isEnabled) return;
            if (config._isDynamic === false && config._isEvaluated) return;

            config._isEvaluated = true;

            var hideOnClasses = config._onClasses;
            var hideOnMediaQuery = config._onMediaQuery;

            var isHiddenOnClasses = !hideOnClasses || (hideOnClasses && this.$html.is(hideOnClasses));
            var isHiddenOnMediaQuery = !hideOnMediaQuery || (hideOnMediaQuery && window.matchMedia && window.matchMedia(hideOnMediaQuery).matches);

            var isHidden = (isHiddenOnClasses && isHiddenOnMediaQuery);

            if (isHidden) {
                model.setOnChildren("_isAvailable", false);
                view.$el.addClass("display-none");
                return;
            }

            model.setOnChildren("_isAvailable", true);
            view.$el.removeClass("display-none");

            this.triggerResize();

        },

        onPageReady: function() {
            this.checkStates();
        },

        checkStates: function() {
            if (!this.managedViews.length) return;

            this.managedViews.forEach(function(view) {
                this.checkState(view);
            }.bind(this));

            Adapt.trigger("pageLevelProgress:update");
        },

        triggerResize: function() {
            $(window).resize();
        },

        remove: function() {
            this.managedViews.length = 0;
        }

    });

    return new Hide();

});
