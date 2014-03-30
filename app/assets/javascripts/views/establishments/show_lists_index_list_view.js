EstablishmentsShowListsIndexListView = Backbone.View.extend({
    events: {
    },

    initialize: function () {
        this.listenTo(this.collection, 'reset', this.render);
        this.listenTo(this.collection, 'paginate', this.paginate);
        this.listenTo(this.model, 'new_listing', this.updateCollection);
        this.collection.establishment_id = this.model.get('id');
        this.collection.per = 10;
        this.collection.favorites = false;

        var params = this.collection.predicate();

        this.collection.fetch({ 
            reset: true, 
            data: params
        });
    },

    render: function () {
        if (this.collection.length > 0) {
            this.$el.html('');

            this.collection.each(function (list){
                this.renderList(list);
            }, this);
            window.scrollTo(0,0);
        } else {
            this.$el.html(render('establishments/show_lists_index_list_no_results', this.model));
        }
    },

    renderList: function (list) {
        var list_view = new ListsIndexListView({
            tagName: 'li',
            model: list,
            favorites: this.collection.favorites
        });

        if (list.get('type') === 'WishList') {
            this.$el.prepend(list_view.el);
        } else {
            this.$el.append(list_view.el);            
        }
    },

    paginate: function (e) {
        var data = { user_id: this.model.get('id'), page: e };
        this.collection.fetch({ reset: true, data: data });
    },

    updateCollection: function (e) {
        var params = this.collection.predicate();
        this.collection.fetch({ reset: true, data: params });
    }
});
