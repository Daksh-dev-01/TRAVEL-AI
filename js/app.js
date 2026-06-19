// AUTH CHECK

function requireAuth() {

    if (
        localStorage.getItem("loggedIn")
        !== "true"
    ) {

        window.location.href =
        "login.html";

    }

}

// LOGOUT

function logout() {

    localStorage.removeItem(
        "loggedIn"
    );

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
    "login.html";

}

// GET USER

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

}

// GET TRIPS

function getTrips() {

    return JSON.parse(
        localStorage.getItem(
            "trips"
        )
    ) || [];

}

// SAVE TRIPS

function saveTrips(trips) {

    localStorage.setItem(
        "trips",
        JSON.stringify(trips)
    );

}