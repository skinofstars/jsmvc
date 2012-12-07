$(document).ready(function(){

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


            var newsUrl = "http://cdnedge.bbc.co.uk/nol/ukfs_news/hi/front_page/ticker.json";

            // hell, just grab the data however you like
            $.getJSON(newsUrl).then(function(data){

                _(data.entries).each(function(item){
                    var entry = new Entry();
                    entry.set({
                        headline: item.headline // modify entry defaults
                    });
                    self.collection.add(entry); // add entry to collection; view is updated via event 'add'
                });
            });

            console.log(self.collection)

            this.render();
        },

        render: function(){
            console.log('render', this.collection);

collection = this.collection
            // do we want to clear the default HTML here?
            // or are we looking to hook into existing node IDs?! (urgh)
            // or are we just offering up <body/> for the HTML?!?!
console.log(this.collection.models)

            $('#main', this.el).html('')

            $('#main', this.el).append("<ul></ul>");

            // _(this.collection.models).each(function(item){ // in case collection is not empty
            //     console.log('yo')
            //     self.appendItem(item);
            // }, this);

// zomg, works in console
// $.each(collection.models, function(i,data){console.log(data.attributes.headline)})
        },

        appendEntry: function(item){
            $('ul', this.el).append("<li>"+ item.headline +"</li>");
        }

    });

    var newsView = new NewsView();
});


