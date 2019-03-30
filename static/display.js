let display = {
    clearModal: function clearModal() {
        while (tableBody_modalResidents[0].firstChild) {
            tableBody_modalResidents[0].removeChild(tableBody_modalResidents[0].firstChild)
        }
        return tableBody_modalResidents[0]
    },
    showLoadingModal: function showLoadingModal() {
        document.getElementById('loading-modal').style.display = "flex";
    },
    hideLoadingModal: function hideLoadingModal() {
        document.getElementById('loading-modal').style.display = "none";
    },

    showLoginModal: function showLoginModal() {
        document.getElementById('login-modal').style.display = "flex";
    },

    hideLoginModal: function hideLoginModal() {
        document.getElementById('login-modal').style.display = "none";
    },

    showRegisterModal: function showRegisterModal() {
        document.getElementById('register-modal').style.display = "flex";
    },

    hideRegisterModal: function hideRegisterModal() {
        document.getElementById('register-modal').style.display = "none";
    },
    showVotesModal: function showVotesModal() {
        document.getElementById('votes-modal').style.display = "flex";
    },

    hideVotesModal: function hideVotesModal() {
        document.getElementById('votes-modal').style.display = "none";
        deleteRowsVotes()
    },



    showVoting: function showVoting() {
        let elements = document.getElementsByClassName('voting');
        for (let el = 0; el<elements.length; el++) {
            elements[el].style.display = "flex";
        }
    },

    hideVoting : function hideVoting() {
        let elements = document.getElementsByClassName('voting');
        for (let el = 0; el<elements.length; el++) {
            elements[el].style.display = "none";
        }
        status = '0'
    },


    viewAfterUserForm: function viewAfterUserForm(message) {
        switch (message) {
            case 'Registration succesful':
                document.getElementById('Login').style.display = "none";
                document.getElementById('Register').style.display = "none";
                let hello = document.getElementById('hello');
                hello.innerText = 'hello ' + registerUsername;
                hello.style.display = "flex";
                document.getElementById('Logout').innerText = 'Logout';
                document.getElementById('Logout').style.display = "flex";
                display.showVoting();
                break;

            case 'Log in succesful':
                document.getElementById('Login').style.display = "none";
                document.getElementById('Register').style.display = "none";
                let hellolog = document.getElementById('hello');
                hellolog.innerText = 'hello ' + loginUsername;
                hellolog.style.display = "flex";
                document.getElementById('Logout').innerText = 'Logout';
                document.getElementById('Logout').style.display = "flex";
                display.showVoting();
                break;

            case 'User already in database':
                break;

            case 'Wrong password. Try again.':
                break;

            case 'User doesn\'t exist. Please register':
                setTimeout(function () {
                    showRegisterModal()
                }, 500);
                break;
        }
    },

    showModalResidents: function showModalresidents(planet) {
        residents = planet.residents;
        title = planet.name;
        tableBody_modalResidents = document.getElementsByClassName('table-residents');
        resident.createHeaderResidents(title);
        resident.createTableResidents(residents);
        document.getElementById('residents-modal').style.display = "flex";
    },

    closeModalResidents: function closeModalresidents() {
        display.clearModal();
        document.getElementById('residents-modal').style.display = "none";
    }

};

function deleteRowsVotes() {
    let tableBodyVote = document.getElementsByClassName('table-votes');
    while (tableBodyVote[0].firstChild) {
        tableBodyVote[0].removeChild(tableBodyVote[0].firstChild)
    }
    return tableBodyVote[0]
}







