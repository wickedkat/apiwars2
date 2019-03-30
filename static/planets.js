let planets = {

        createTable: function createTable(results) {
            for (i = 0; i < results.length; i++) {
                planet = results[i];
                createRow(planet)
            }
        },
        deleteRows: function deleteRows() {

            while (tableBody[0].firstChild) {
                tableBody[0].removeChild(tableBody[0].firstChild)
            }
            return tableBody[0]
        }
    };


/*                       CREATE TABLE - PLANETS                    */


function createRow(planet) {
    let row = document.createElement('tr');
    tableBody[0].appendChild(row);
    residents = planet.residents;
    row.innerHTML = '<td>' + planet.name + '</td>' +
        '<td>' + format.formatDiameter(planet.diameter) + ' km' + '</td>' +
        '<td>' + planet.climate + '</td>' +
        '<td>' + planet.terrain + '</td>' +
        '<td>' + format.formatSurfaceWater(planet.surface_water) + '</td>' +
        '<td>' + format.formatPopulation(planet.population) + '</td>' +
        '<td>' + residentsHandler(planet.residents) + '</td>' +
        '<td class="voting">' + votingHandler(planet.name, planet.url) + ' </td>'
}


function votingHandler(id, url) {
    url = url.slice(29, -1);
    return '<button type="button" id="' + id + '" class="btn btn-warning btn-sm" data-url="' + url + '" onclick="voting.voteForPlanet(this.id, ' + url + ' )" > Vote </button>'
}


function residentsHandler(residents) {
    if (residents.length === 0) {
        return 'No known resident'
    } else {
        return '<button id=" ' + i + ' " type="button" class="btn btn-warning btn-sm btn-residents" data-residents="' + residents + '" ' +
            'onclick="display.showModalResidents(results[parseInt(this.id)])">' + residents.length + ' resident(s)</button>'
    }
}