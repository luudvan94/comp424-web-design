function newsList(url, imgUrl, title, content) {
 return '<li class="news-li col-xs-12 border"> <div class="col-2 col-s-4 col-xs-12 news-logo"> <img src="' + imgUrl + '" id="news-logo-image" /> </div> <div class="col-10 col-s-8 col-xs-12 news-content"> <a href="' + url + '" target="_blank"> <div class="title">' + title + '</div> <div class="content">' + content + '</div> </a> </div> </li>';   
}