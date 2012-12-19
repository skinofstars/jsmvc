$(document).ready(function(){

    var DecoratorContent = Backbone.Model.extend({
        defaults: {
            title: 'Default page title'
        }
    });

    var Entry = Backbone.Model.extend({
        defaults: {
            headline: 'Default model headline'
        }
    });

    var Entries = Backbone.Collection.extend({
        model: Entry
    });

    var NewsView = Backbone.View.extend({
        el: $('body'),

        initialize: function(){
            _.bindAll(this, 'render', 'appendEntry');

            var self = this;

            this.collection = new Entries();
            this.decoratorContent = new DecoratorContent();

            var newsUrl = "http://cdnedge.bbc.co.uk/nol/ukfs_news/hi/front_page/ticker.json";

            // hell, just grab the data however you like
            $.getJSON(newsUrl).then(function(data){

                self.decoratorContent.set({'title': data.name}); // probably nicer ways to do this

                _(data.entries).each(function(item){
                    var entry = new Entry();
                    entry.set({
                        headline: item.headline // modify entry defaults
                    });
                    self.collection.add(entry); // add entry to collection; view is updated via event 'add'
                });

                self.render(); // because waiting for data? using triggers would probably be better
            });
        },

        render: function(){

            // do we want to clear the default HTML here?
            // or are we looking to hook into existing node IDs?! (urgh)
            // or are we just offering up <body/> for the HTML?!?!

            //$('#main', this.el).html('');
            $('h1#title', this.el).text(this.decoratorContent.get('title'));
            //$('#main', this.el).append("<ul></ul>");

            models = this.collection.models;

            _.each(models, function(item){ // in case collection is not empty
                this.appendEntry(item);
            }, this);


        },

        appendEntry: function(item){
            $('ul#entries', this.el).append("<li>"+ item.get('headline') +"</li>");
        }

    });

    var newsView = new NewsView();
});


