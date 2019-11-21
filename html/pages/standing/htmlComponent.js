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

function loadingStandingList() {
    return '<li class="col-12 col-s-12 col-xs-12"><div class="wrapper">' +
        '<div class="wrapper-cell">' +
        '<div class="text col-12 col-s-12 col-xs-12">' +
        '<div class="text-line"> </div>' +
        '</div>' +
        '</div>' +
        '</div> </li>';
}

function standingList(team) {
    return '<li class="team"><a href="#" data-teamid="' + team.team_id + '" data-rank="' + team.overall_league_position + '"><div class="col-1 col-s-1 col-xs-1">' + team.overall_league_position + '</div> <div class=" col-4 col-s-4 col-xs-4"> <span>' + team.team_name + '</span> </div> <div class="col-1 col-s-1 col-xs-1">' + team.overall_league_payed + '</div> <div class="col-1 col-s-1 col-xs-1">' + team.overall_league_W + '</div> <div class="col-1 col-s-1 col-xs-1">' + team.overall_league_D + '</div> <div class="col-1 col-s-1 col-xs-1">' + team.overall_league_L + '</div> <div class="col-1 col-s-1 col-xs-1">' + team.overall_league_GF + '</div> <div class="col-1 col-s-1 col-xs-1">' + team.overall_league_GA + '</div> <div class="col-1 col-s-1 col-xs-1">' + team.overall_league_PTS + '</div></a> </li>';
}

function standingHeaderList(leagueName) {
    return '<li class="header"> <div class="col-1 col-s-1 col-xs-1">#</div> <div class=" col-4 col-s-4 col-xs-4"> <span>' + leagueName + '</span> </div> <div class="col-1 col-s-1 col-xs-1">P</div> <div class="col-1 col-s-1 col-xs-1">W</div> <div class="col-1 col-s-1 col-xs-1">D</div> <div class="col-1 col-s-1 col-xs-1">L</div> <div class="col-1 col-s-1 col-xs-1">GF</div> <div class="col-1 col-s-1 col-xs-1">GA</div> <div class="col-1 col-s-1 col-xs-1">PTS</div> </li>';
}

function statList(title, content) {
    return '<li class="stat"> <div class="col-4 col-s-4 col-xs-6 category">' + title +  ":" + '</div> <div class="col-8 col-s-8 col-xs-6"> ' + content + ' </div> </li>';
}

function playerHeaderList() {
    return '<li class="player-headers"> <div class="col-7 col-s-7 col-xs-7">Players</div> <div class="col-4 col-s-4 col-xs-4">Position</div> <div class="col-1 col-s-1 col-xs-1">#</div> </li>';
}

function playerList(playerName, playerPosition, playerNum) {
    return '<li class="player"> <div class="col-7 col-s-7 col-xs-7">' + playerName + '</div> <div class="col-4 col-s-4 col-xs-4">' + playerPosition + '</div> <div class="col-1 col-s-1 col-xs-1">' + playerNum + '</div> </li>';
}
