let data;
let results;
let tableBody;
let tableBody_modalResidents;
let next = '';
let previous = '';
let planet;
let residents;
let residentUrl;
let message;
let registerUsername;
let loginUsername;
let title;
let i;
let residentDetails;
let status;
let votes;
const firstPageUrl = 'https://swapi.co/api/planets/';
init();


function init() {
    firstPage(firstPageUrl);
    authentication.handleUserForms();
}


function firstPage(url) {
    let swapiRequest = new XMLHttpRequest();
    swapiRequest.open('GET', url);
    swapiRequest.onloadstart = display.showLoadingModal();
    swapiRequest.onloadend = function () {
        display.hideLoadingModal();
        data = JSON.parse(swapiRequest.response);
        results = data['results'];
        next = data['next'];
        previous = data['previous'];
        tableBody = document.getElementsByClassName('planets');
        planets.createTable(results);

    };
    swapiRequest.send();
}



/*                          NAVIGATION                                          */

function Previous() {
    if (previous == null) {
        alert('This is the first page')
    }
    changePage(previous)
}

function Next() {
    debugger;
    if (next === null) {
        alert('This is the last page')
    }
    changePage(next)
}


function changePage(url) {
    let swapiRequest = new XMLHttpRequest();
    swapiRequest.open('GET', url);
    swapiRequest.onloadstart = display.showLoadingModal();
    swapiRequest.onloadend = function () {
        display.hideLoadingModal();
        data = JSON.parse(swapiRequest.response);
        results = data['results'];
        next = data['next'];
        previous = data['previous'];
        tableBody = document.getElementsByTagName('tbody');
        planets.deleteRows();
        planets.createTable(results);
        if (status === '1') {
            display.showVoting()
        }


    };
    swapiRequest.send();
}


















