
$(document).ready(function(){
    var binding = ko.applyBindings(new NewsView());
});

function NewsView(){
    var self = this;

    self.title = ko.observable();
    self.entries = ko.observableArray([]);

    var newsUrl = "http://cdnedge.bbc.co.uk/nol/ukfs_news/hi/front_page/ticker.json";

    // in a more complex, you'd probably create a data handler
    $.getJSON(newsUrl).then(function(data){
        console.log(data);

        self.title(data.name);

        $.each(data.entries, function(i,entry){

            // in a more complex app, you'd probably create an entity model
            //   with it's own data loading and local storage persisting functions
            self.entries.push(entry);
        });
    });

}

