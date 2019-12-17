
$(window).resize(function () {
    $('#match-detail').css("display", "none");
    if ($(window).width() > 992) {
        lockScrolling()
    } else {
        unlockScrolling();
    }
});

$(document).ready(function () {
    if ($(window).width() > 992) {
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

    $("#leagues-list").empty();
    $("#match-score").empty();
    $("#news").empty();

    for (i = 0; i < 10; i++) {
        $("#leagues-list").append(loadingLeagueNameList('normal'));
        $("#leagues-list").append(loadingLeagueNameList('small'));

        $("#match-score").append(loadingMatchList('normal'));
        $("#match-score").append(loadingMatchList('small'));

        $("#news").append(loadingNewsList('normal'));
        $("#news").append(loadingNewsList('small'));
    }

    loadData();

});

var currentMatchID = 0;
function loadData() {
    getJSONFromFile(league)
        .then(response => {
            const map = new Map();
            response.forEach(function (league) {

                const collection = map.get(league.country_name);
                if (!collection) {
                    map.set(league.country_name, [league]);
                } else {
                    collection.push(league);
                }
            })

            return map;
        })
        .then(mappedResponse => {
            // console.log(mappedResponse);
            var index = 0;
            $("#leagues-list").empty();
            for (const [countryName, leagues] of mappedResponse.entries()) {
                $("#leagues-list").append(countryNameList(countryName));

                leagues.forEach(function (league) {
                    $("#leagues-list").append(leagueNameList("normal", league.league_name, league.league_id));
                    $("#leagues-list").append(leagueNameList("small", league.league_name, league.league_id));

                    if (index == 0) {
                        reloadDataMatchScore(league.league_id);
                        index++;
                    }
                })
            }

            $(".league-name a").click(function (e) {
                e.preventDefault();
                const leagueId = $(this).data("leagueid");

                reloadDataMatchScore(leagueId);
            });

        })

    getJSON("https://newsapi.org/v2/top-headlines?country=gb&category=sports&apiKey=6dee5ffad66f4d30a5a6fcd787c7de94")
        .then(response => {
            if (response !== null) {
                $("#news").empty();

                response.articles.forEach(function (article) {
                    $("#news").append(newsList(article.url, article.urlToImage, article.title, article.content))
                })
            }
        })
}

var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

function reloadDataMatchScore(league_id) {
    $("#match-score").empty();

    for (i = 0; i < 10; i++) {
        $("#match-score").append(loadingMatchList('normal'));
        $("#match-score").append(loadingMatchList('small'));
    }

    getJSON("https://apiv2.apifootball.com/?action=get_events&from=2019-11-06&to=2019-11-13&league_id=" + league_id + "&APIkey=b47f6c0ed9a93f917a90078ee60eb94d1d2b5f8048d40d3af159731e53bffdc1")
        .then(response => {
            $("#match-score").empty();
            
            const groupByDateMatches = groupBy(response, "match_date");

            // console.log(groupByDateMatches);

            for (const [ key, value ] of Object.entries(groupByDateMatches)) {
                $("#match-score").append("<h4>"+ key +"</h4>");

                value.forEach(function(match) {
                    $("#match-score").append(matchListNormal("FT", match.match_hometeam_name, match.match_hometeam_score + " : " + match.match_awayteam_score, match.match_awayteam_name, match.match_id));
                    $("#match-score").append(matchListSmall("FT", match.match_hometeam_name, match.match_hometeam_score + " : " + match.match_awayteam_score, match.match_awayteam_name, match.match_id));
                })
            }

            $(".match a").click(function (e) {
                e.preventDefault();
                $('#match-detail').css("display", "block");
                $('#menu-expand').css("display", "none");
                const matchid = $(this).data("matchid");
                currentMatchID = matchid;

                getMatchDetail(matchid);
                $("html, body").animate({
                    scrollTop: $('#match-detail').offset().top
                }, { duration: 700, complete: function () { lockScrolling() } });
            });

            $("#events-link").click(function (e) {
                getMatchDetail(currentMatchID, true);
            })
            $("#lineup-link").click(function (e) {
                getMatchDetail(currentMatchID, false);
            })


            $("#back-button").click(function (e) {
                unlockScrolling();

                $("html, body").animate({
                    scrollTop: 0
                }, { duration: 700 });


                $('#menu-expand').css("display", "block");
                $('#match-detail').css("display", "none");
            })
        });
}

function substitutionIcon() {
    return '<div style="margin-right: 5px; margin-left: 5px"><img src="https://cdn0.iconfinder.com/data/icons/football-31/64/change-football-soccer-competition-sports-player-512.png" width="25" height="25"></img></div>';
}

function goalIcon() {
    return '<div style="margin-right: 5px; margin-left: 5px"><img src="https://carlisletheacarlisletheatre.org/images/soccer-ball-clipart-transparent-background-1.png" width="25" height="25"></img></div>';
}

function cardIcon(isYellow = true) {

    if (!isYellow) {
        return '<div style="margin-right: 5px; margin-left: 5px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Red_card.svg/1200px-Red_card.svg.png" width="25" height="25"></img></div>';
    }

    return '<div style="margin-right: 5px; margin-left: 5px"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Yellow_card.svg/1200px-Yellow_card.svg.png" width="25" height="25"></img></div>';
}

function getMatchDetail(matchId, isMatchEvents = true) {
    getJSON("https://apiv2.apifootball.com/?action=get_events&from=2019-11-06&to=2019-11-13&match_id=" + matchId + "&APIkey=b47f6c0ed9a93f917a90078ee60eb94d1d2b5f8048d40d3af159731e53bffdc1")
        .then(response => {

            getJSON("https://apiv2.apifootball.com/?action=get_teams&team_id=" + response[0].match_hometeam_id + "&APIkey=b47f6c0ed9a93f917a90078ee60eb94d1d2b5f8048d40d3af159731e53bffdc1")
                .then(teamResponse => {
                    $("#logo-teamA").attr("src", teamResponse[0].team_badge);
                })

            getJSON("https://apiv2.apifootball.com/?action=get_teams&team_id=" + response[0].match_awayteam_id + "&APIkey=b47f6c0ed9a93f917a90078ee60eb94d1d2b5f8048d40d3af159731e53bffdc1")
                .then(teamResponse => {
                    $("#logo-teamB").attr("src", teamResponse[0].team_badge);
                })


            const goals = response[0].goalscorer;
            const cards = response[0].cards;
            const substitutions = response[0].substitutions;
            const teamHomelineup = response[0].lineup.home.starting_lineups
            const teamAwaylineup = response[0].lineup.away.starting_lineups

            $("#score-content").empty();
            $("#score-content").append(response[0].match_hometeam_score + " - " + response[0].match_awayteam_score);

            $("#team-name-a").empty();
            $("#team-name-a").append(response[0].match_hometeam_name);

            $("#team-name-b").empty();
            $("#team-name-b").append(response[0].match_awayteam_name);


            var event = [];

            goals.forEach(function (goal) {
                var time = parseInt(goal.time);
                var scorer = goal.home_scorer != "" ? goal.home_scorer : goal.away_scorer;
                event.push({ "time": time, "event": "goal", "isHomeTeam": goal.home_scorer != "" ? true : false, "content": goalIcon() + goal.time + "' - goallllll! by " + scorer });
            });

            cards.forEach(function (card) {
                var time = parseInt(card.time);
                const correctCard = card.card.startsWith("y") ? cardIcon(true) : cardIcon(false);
                var scorer = card.home_fault != "" ? card.home_fault : card.away_fault;
                event.push({ "time": time, "event": "card", "isHomeTeam": card.home_fault != "" ? true : false, "content": correctCard + card.time + "' - " + card.card + " for " + scorer });
            });

            substitutions.away.forEach(function (substitution) {
                var time = parseInt(substitution.time);
                event.push({ "time": time, "event": "substitution", "isHomeTeam": false, "content": substitutionIcon() + substitution.time + "' - " + substitution.substitution });
            });

            substitutions.home.forEach(function (substitution) {
                var time = parseInt(substitution.time);
                event.push({ "time": time, "event": "substitution", "isHomeTeam": true, "content": substitutionIcon() + substitution.time + "' - " + substitution.substitution });
            });

            event.sort((a, b) => a.time - b.time);

            $("#match-events").empty();

            if (isMatchEvents) {
                event.forEach(function (e) {
                    $("#match-events").append(matchEventList(e));
                })
            } else {
                for (i = 0; i < 11; i++) {
                    $("#match-events").append(linupList(teamHomelineup[i].lineup_number + " - " + teamHomelineup[i].lineup_player, teamAwaylineup[i].lineup_number + " - " + teamAwaylineup[i].lineup_player));
                }
            }

        })
}




