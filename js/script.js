
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
     console.log($nytElem);
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    streetStr = $('#street').val();
    cityStr = $('#city').val();
    addressStr = streetStr + ', '+cityStr;
    console.log(addressStr);

    $greeting.text("You want to live at: "+ streetStr + " and "+ cityStr);
    var streetviewURL='http://maps.googleapis.com/maps/api/streetview?size=600x400&location='+addressStr;
    //var streetviewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=1324%20Locust%20St,%20Philadelphia';
    $body.append("<img class='bgimg' src="+streetviewURL+ '">');

    // YOUR CODE GOES HERE!
    var nytimesUrl = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+cityStr+'&sort=newest&api-key=895046fa5c4193a15351189f360480d5:8:56255201'; 
    $.getJSON(nytimesUrl , function (data) {
        
        $nytHeaderElem.text("NYT articles about "+ cityStr);

        articles = data.response.docs;
        console.log(articles[0]);
        for (var i = 0; i < articles.length; i++)
        {
            var article = articles[i];
            $nytElem.append('<li class="article">'
                +'<a href="'+article.web_url+'">'+article.headline.main+
                '</a>'+ '<p>'+article.snippet + '</p>' + '</li>');
        }
       

    }).error(function(e)
    { 
    $nytElem.append('<p> Not found </p>');

    });

    var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch'+
    '&search='+ cityStr + '&format=json&callback=wikiCallback';

    $.ajax( {url: wikiURL, 
        dataType: "jsonp",
    success: function(response) {
        var articlesList = response[1];
        for (var i = 0; i < articlesList.length; i++)
        {
            var articleStr = articlesList[i];
            var url = 'http://en.wikipedia.org/wiki/'+articleStr;
            $wikiElem.append('<li>'
                +'<a href="'+url+'">'+articleStr+
                '</a>'+ '</li>');
        }
    }
     });

    return false;
};

$('#form-container').submit(loadData);

function test() {

    console.log("hello2");
    return false;
}

 //loadData();
