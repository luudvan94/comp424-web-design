function countryNameList(countryName) {
    return '<div class="country-header">' + countryName + '</div>';
}

function leagueNameList(className, leagueName, leagueid) {
    return '<div class="league-name ' + className + '">' + '<a href="#" data-leagueid="' + leagueid + '"><div class="col-9 col-s-9 col-xs-9"> <div class="league-title">' + leagueName + '</div> </div></a>' + '</div>';
}

function matchListNormal(logo, teamA, score, teamB, matchId) {
    return '<div class="match normal"><a href="#" data-matchid="' + matchId + '"><span class="col-3 logo">' + logo + '</span> <span class="col-3 teamA">' + teamA + '</span> <span class="col-2 score">' + score + '</span> <span class="col-4 teamB">' + teamB + '</span></a> </div>';
}

function matchListSmall(logo, teamA, score, teamB, matchId) {
    return '<div class="match small"><a href="#" data-matchid="' + matchId + '"><div class="col-s-4 col-xs-4"> <span class="logo">' + logo + '</span> </div> <div class="col-s-6 col-xs-6"> <span class="col-s-12 col-xs-12">' + teamA + '</span> <span>' + teamB + '</span> </div> <div class="col-s-2 col-xs-2"> <span class="time">' + score + '</span> </div></a> </div>';
}

function newsList(url, imgUrl, title, content) {
    return '<li class="news"> <a href="' + url + '" target="_blank"> <div class="news-image"><img src="'+ imgUrl + '" alt="Smiley face"></div> <div class="title">' + title + '</div> <div class="content">' + content + '</div> </a> </li>';
}

function loadingLeagueNameList(className) {
    return '<li class="league-name ' + className + '"><div class="wrapper">' +
        '<div class="wrapper-cell">' +
        '<div class="image col-4 col-s-4 col-xs-4"></div>' +
        '<div class="text col-8 col-s-8 col-xs-10">' +
        '<div class="text-line"> </div>' +
        '</div>' +
        '</div>' +
        '</div> </li>';
}

function loadingNewsList(className) {
    return '<li class="league-name ' + className + '"><div class="news-wrapper">' +
        '<div class="news-loading-image"></div>' +
        '<div class="col-12 col-s-12"><div class="text-line"> </div></div>' +
        // '<div class="text-line"> </div>' +
        '</div> </li>';
}

function loadingMatchList(className) {
    return '<li class="match ' + className + '"><div class="wrapper">' +
        '<div class="wrapper-cell">' +
        '<div class="image col-4 col-s-4 col-xs-4"></div>' +
        '<div class="text col-8 col-s-8 col-xs-10">' +
        '<div class="text-line"> </div>' +
        '</div>' +
        '</div>' +
        '</div> </li>';
}

function matchEventList(event) {
    if (event.isHomeTeam) {
        return '<li><div class="col-6 cols-6 col-xs-6 fromA">' + event.content + '</div> <div class="col-6 cols-6 col-xs-6 fromB"> </div></li>';
    } else {
        return '<li><div class="col-6 cols-6 col-xs-6 fromA"> </div> <div class="col-6 cols-6 col-xs-6 fromB">' + event.content + '</div></li>';
    }
    
}

function linupList(playerA, playerB) {
    return '<li><div class="col-6 cols-6 col-xs-6 fromA">' + playerA + '</div> <div class="col-6 cols-6 col-xs-6 fromB"> ' + playerB + ' </div></li>';
}