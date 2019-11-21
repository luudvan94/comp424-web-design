$(window).resize(function () {
    //$('#match-detail').css("display", "none");

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
    $("#standing").empty();

    for (i = 0; i < 10; i++) {
        $("#leagues-list").append(loadingLeagueNameList('normal'));
        $("#leagues-list").append(loadingLeagueNameList('small'));

        $("#standing").append(loadingStandingList());
    }

    loadData();
});

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
                        getStandingData(league.league_id);
                        index++;
                    }
                })
            }

            $(".league-name a").click(function (e) {
                e.preventDefault();
                const leagueId = $(this).data("leagueid");

                getStandingData(leagueId);
            });


        })
}

var teamList = [];

function getStandingData(leagueid) {
    $("#standing").empty();

    for (i = 0; i < 10; i++) {
        $("#standing").append(loadingStandingList());
    }
    getJSON("https://apiv2.apifootball.com/?action=get_standings&league_id=" + leagueid + "&APIkey=b47f6c0ed9a93f917a90078ee60eb94d1d2b5f8048d40d3af159731e53bffdc1")
        .then(response => {
            teamList = response;


            $("#standing").empty();
            $("#standing").append(standingHeaderList(response[0].league_name));
            response.forEach(function (team) {
                $("#standing").append(standingList(team));
            })

            $(".team a").click(function (e) {
                e.preventDefault();
                $('#team-detail').css("display", "block");
                $('#menu-expand').css("display", "none");
                const teamid = $(this).data("teamid");
                const rank = $(this).data("rank");

                const info = teamList.filter(team => team.team_id == teamid);
                loadTeamInfo(teamid, rank, info[0])
                $("html, body").animate({
                    scrollTop: $('#team-detail').offset().top
                }, { duration: 700, complete: function () { lockScrolling() } });
            });


            $("#back-button").click(function (e) {
                unlockScrolling();
                $('#team-detail').css("display", "none");
                $('#menu-expand').css("display", "block");
                $("html, body").animate({
                    scrollTop: 0
                }, 700);
            })
        })
}

function loadTeamInfo(teamid, rank, overralInfo) {
    $("#team-name").empty();
    $("#rank").empty();
    $("#team-logo").empty();
    $("#team-stats").empty();
    $("#team-players").empty();

    getJSON("https://apiv2.apifootball.com/?action=get_teams&team_id=" + teamid + "&APIkey=b47f6c0ed9a93f917a90078ee60eb94d1d2b5f8048d40d3af159731e53bffdc1")
        .then(response => {
            console.log(response[0]);
            $("#team-name").html(response[0].team_name);
            $("#rank").html(rank);
            $("#team-logo").attr("src", response[0].team_badge);

            $("#team-stats").append(statList("Coach", response[0].coaches[0].coach_name));
            $("#team-stats").append(statList("Match played", overralInfo.overall_league_payed));
            $("#team-stats").append(statList("Win", overralInfo.overall_league_W));
            $("#team-stats").append(statList("Draw", overralInfo.overall_league_D));
            $("#team-stats").append(statList("Lose", overralInfo.overall_league_L));
            $("#team-stats").append(statList("Goal for", overralInfo.overall_league_GF));
            $("#team-stats").append(statList("Goal against", overralInfo.overall_league_GA));
            $("#team-stats").append(statList("Home league position", overralInfo.home_league_position));
            $("#team-stats").append(statList("Home played", overralInfo.home_league_payed));
            $("#team-stats").append(statList("Home win", overralInfo.home_league_W));
            $("#team-stats").append(statList("Home draw", overralInfo.home_league_D));
            $("#team-stats").append(statList("Home lose", overralInfo.home_league_L));
            $("#team-stats").append(statList("Home goal for", overralInfo.home_league_GF));
            $("#team-stats").append(statList("Home goal against", overralInfo.home_league_GA));
            $("#team-stats").append(statList("Home points", overralInfo.home_league_PTS));
            $("#team-stats").append(statList("Away league position", overralInfo.away_league_position));
            $("#team-stats").append(statList("Away played", overralInfo.away_league_payed));
            $("#team-stats").append(statList("Away win", overralInfo.away_league_W));
            $("#team-stats").append(statList("Away draw", overralInfo.away_league_D));
            $("#team-stats").append(statList("Away lose", overralInfo.away_league_L));
            $("#team-stats").append(statList("Away goal for", overralInfo.away_league_GF));
            $("#team-stats").append(statList("Away goal against", overralInfo.away_league_GA));
            $("#team-stats").append(statList("Away points", overralInfo.away_league_PTS));

            $("#team-players").append(playerHeaderList());
            response[0].players.forEach(function (player) {
                $("#team-players").append(playerList(player.player_name, player.player_type, player.player_number));
            })

        })

}