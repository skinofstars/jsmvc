angular.module("News", ['ngResource'])

function NewsCtrl($scope, $resource){

    // ok, we're not actually using $resource
    // we use $.getJSON instead as the bbc news ticker
    // would otherwise fire a cross origin error

    $scope.title = '';

    $scope.items = [{
        text: 'basic item'
    }];

    var newsUrl = "http://cdnedge.bbc.co.uk/nol/ukfs_news/hi/front_page/ticker.json";

    $.getJSON(newsUrl).then(function(data){
        $scope.title = data.name;
        $.each(data.entries, function(i,entry){
            // because we're using jquery's $.getJSON method
            // angular considers it out of scope
            // so we have to use the $apply function
            $scope.$apply(function(){
                $scope.items.push({
                    text: entry.headline
                })
            });
        });

    });
}
