// =========================
// AUTH CHECK
// =========================

if(
    localStorage.getItem("loggedIn")
    !== "true"
){
    window.location.href =
    "login.html";
}

// =========================
// LOGOUT
// =========================

const logoutBtn =
document.getElementById(
    "logoutBtn"
);

if(logoutBtn){

    logoutBtn.addEventListener(
        "click",
        () => {

            localStorage.removeItem(
                "loggedIn"
            );

            localStorage.removeItem(
                "currentUser"
            );

            window.location.href =
            "login.html";
        }
    );
}

// =========================
// LOAD TRIPS PAGE
// =========================

if(
    document.getElementById(
        "plannedTrips"
    )
){

    loadTripsPage();
}

// =========================
// SEARCH
// =========================

const searchInput =
document.getElementById(
    "searchTrips"
);

if(searchInput){

    searchInput.addEventListener(
        "input",
        loadTripsPage
    );
}

// =========================
// LOAD TRIPS
// =========================

function loadTripsPage(){

    const trips =
    JSON.parse(
        localStorage.getItem(
            "trips"
        )
    ) || [];

    const planned =
    document.getElementById(
        "plannedTrips"
    );

    const ongoing =
    document.getElementById(
        "ongoingTrips"
    );

    const completed =
    document.getElementById(
        "completedTrips"
    );

    planned.innerHTML = "";
    ongoing.innerHTML = "";
    completed.innerHTML = "";

    const searchTerm =
    document
    .getElementById(
        "searchTrips"
    )
    .value
    .toLowerCase();

    trips
    .filter(trip =>
        trip.destination
        .toLowerCase()
        .includes(searchTerm)
    )
    .forEach(trip => {

        const card = createTripCard(
            trip
        );

        if(
            trip.status ===
            "Planned"
        ){

            planned.appendChild(card);

        }else if(
            trip.status ===
            "Ongoing"
        ){

            ongoing.appendChild(card);

        }else{

            completed.appendChild(card);
        }
    });
}

// =========================
// CARD
// =========================

function createTripCard(trip){

    const card =
    document.createElement("div");

    card.className =
    "trip-card";

    card.innerHTML =

    `
    <h3>
        ${trip.destination}
    </h3>

    <p>
        📅 ${trip.startDate}
        -
        ${trip.endDate}
    </p>

    <p>
        👥 ${trip.travelers}
        Traveler(s)
    </p>

    <p>
        Readiness:
        ${trip.readiness}%
    </p>

    <span class="badge">
        ${trip.status}
    </span>

    <br><br>

    <button
        class="btn-primary"
    >
        View Details
    </button>
    `;

    card.querySelector("button")
    .addEventListener(
        "click",
        () => {

            localStorage.setItem(
                "selectedTrip",
                trip.id
            );

            window.location.href =
            "trip-details.html";
        }
    );

    return card;
}

// =========================
// DETAILS PAGE
// =========================

if(
    document.getElementById(
        "tripDetails"
    )
){

    loadTripDetails();
}

// =========================
// DETAILS
// =========================

function loadTripDetails(){

    const tripId =
    localStorage.getItem(
        "selectedTrip"
    );

    const trips =
    JSON.parse(
        localStorage.getItem(
            "trips"
        )
    ) || [];

    const trip =
    trips.find(
        t =>
        t.id == tripId
    );

    if(!trip){

        document
        .getElementById(
            "tripDetails"
        )
        .innerHTML =
        "<h2>Trip Not Found</h2>";

        return;
    }

    document
    .getElementById(
        "tripDetails"
    )
    .innerHTML =

    `
    <h1>
        ${trip.destination}
    </h1>

    <br>

    <p>
        📅 Dates:
        ${trip.startDate}
        to
        ${trip.endDate}
    </p>

    <br>

    <p>
        👥 Travelers:
        ${trip.travelers}
    </p>

    <br>

    <p>
        📌 Status:
        ${trip.status}
    </p>

    <br>

    <p>
        🎯 Readiness:
        ${trip.readiness}%
    </p>

    <br>

    <div class="progress">

        <div
            class="progress-fill"
            style="
            width:${trip.readiness}%;
            "
        ></div>

    </div>
    `;

    document
    .getElementById(
        "deleteTripBtn"
    )
    .addEventListener(
        "click",
        () => {

            if(
                confirm(
                    "Delete this trip?"
                )
            ){

                const updatedTrips =
                trips.filter(
                    t =>
                    t.id != tripId
                );

                localStorage.setItem(
                    "trips",
                    JSON.stringify(
                        updatedTrips
                    )
                );

                localStorage.removeItem(
                    "selectedTrip"
                );

                window.location.href =
                "my-trips.html";
            }
        }
    );
}