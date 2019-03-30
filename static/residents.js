let resident = {

    createTableResidents: function createTableResidents(residents) {
        for (i = 0; i < residents.length; i++) {
            residentUrl = residents[i];
            getResidentsdetails(residentUrl)
        }
    },

    createHeaderResidents: function createHeaderResidents(title) {
        document.getElementById('residents-title').innerHTML = 'Residents of ' + title


    }
};


/*                                 CREATE TABLE - RESIDENTS                               */



function getResidentsdetails(residentUrl) {
    let residentRequest = new XMLHttpRequest();
    residentRequest.open('GET', residentUrl);
    residentRequest.onloadstart = display.showLoadingModal();
    residentRequest.onloadend = function () {
        display.hideLoadingModal();
        residentDetails = JSON.parse(residentRequest.response);
        createRowResident(residentDetails)
    };
    residentRequest.send()
}




function createRowResident(residentDetails) {
    let row_r = document.createElement('tr');
    tableBody_modalResidents[0].appendChild(row_r);
    row_r.innerHTML = '<td>' + residentDetails.name + '</td>' +
        '<td>' + format.formatHeight(residentDetails.height) + '</td>' +
        '<td>' + format.formatMass(residentDetails.mass) + '</td>' +
        '<td>' + residentDetails.skin_color + '</td>' +
        '<td>' + residentDetails.hair_color + '</td>' +
        '<td>' + residentDetails.eye_color + '</td>' +
        '<td>' + residentDetails.birth_year + '</td>' +
        '<td>' + format.formatGender(residentDetails.gender) + '</td>'
}
