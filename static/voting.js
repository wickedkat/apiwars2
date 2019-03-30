let voting = {
    voteForPlanet : function voteForPlanet(planet, planet_id) {
        let voteRequest = new XMLHttpRequest();
        voteRequest.onreadystatechange = function () {
            if (voteRequest.readyState == 4) {
                if (voteRequest.status == 200) {
                    message = JSON.parse(voteRequest.response);
                    alert(message)
                } else {
                    alert('Connection error. Try again later.');
                }
            }

        };
        let vote = {'planet_id': planet_id, 'planet_name': planet};
        vote = JSON.stringify(vote);
        voteRequest.open("POST", "/vote_planet");
        voteRequest.setRequestHeader('Content-Type', 'application/json');
        voteRequest.send(vote);


    },

    getVotingStatistics: function getVotingStatistics() {
        let statisticsRequest = new XMLHttpRequest();
        debugger;
        statisticsRequest.open('GET', '/statistics');
        statisticsRequest.onloadstart = display.showLoadingModal();
        statisticsRequest.onreadystatechange = function () {
            if (statisticsRequest.readyState == 4) {
                if (statisticsRequest.status == 200) {
                    display.hideLoadingModal();
                    votes = JSON.parse(statisticsRequest.response);
                    createTableVotes(votes);
                    display.showVotesModal()
                }
            }
        };
        statisticsRequest.send();

    }
}






function createTableVotes(votes) {
    for (i = 0; i < votes.length; i++) {
        planet = votes[i];
        createRowVote(planet)

    }
}

function createRowVote(planet) {
    let row = document.createElement('tr');
    let tableBodyVote = document.getElementsByClassName('table-votes');
    tableBodyVote[0].appendChild(row);
    row.innerHTML = '<td>' + planet.planet_name + '</td>' +
        '<td>' + planet.votes + '</td>'
}