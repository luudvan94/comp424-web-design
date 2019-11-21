
$(window).resize(function() {
    $('#match-detail').css("display", "none");
    if ($( window ).width() > 992) {
        lockScrolling()
    } else {
        unlockScrolling();
    }
});

$(document).ready(function () {
    if ($( window ).width() > 992) {
        $('html, body').css({
            overflow: 'hidden',
            height: '100%'
        });
    } else {
        $('html, body').css({
            overflow: 'scroll',
            height: 'auto'
        });
    }

    getJSON("https://newsapi.org/v2/top-headlines?country=gb&category=sports&apiKey=6dee5ffad66f4d30a5a6fcd787c7de94")
        .then(response => {
            if (response !== null) {
                $("#news-table").empty();

                response.articles.forEach(function (article) {
                    $("#news-table").append(newsList(article.url, article.urlToImage, article.title, article.content))
                })
            }
        })
})




