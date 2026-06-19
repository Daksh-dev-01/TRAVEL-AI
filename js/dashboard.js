// =========================
// AUTH PROTECTION
// =========================

if (
    localStorage.getItem("loggedIn")
    !== "true"
) {
    window.location.href =
        "login.html";
}

// =========================
// USER INFO
// =========================

const currentUser =
JSON.parse(
    localStorage.getItem(
        "currentUser"
    )
);

if (currentUser) {

    document.getElementById(
        "welcomeText"
    ).textContent =
    `Welcome Back, ${currentUser.name}`;

}

// =========================
// LOAD TRIPS
// =========================

const trips =
JSON.parse(
    localStorage.getItem(
        "trips"
    )
) || [];

// =========================
// QUICK STATS
// =========================

function updateStats() {

    const completedTrips =
    trips.filter(
        trip =>
        trip.status ===
        "Completed"
    );

    document.getElementById(
        "completedTripsCount"
    ).textContent =
    completedTrips.length;

    document.getElementById(
        "countriesCount"
    ).textContent =
    new Set(
        completedTrips.map(
            trip =>
            trip.country ||
            trip.destination
        )
    ).size;

    document.getElementById(
        "moneySaved"
    ).textContent =
    `₹${completedTrips.length * 5000}`;

}

// =========================
// READINESS SCORE
// =========================

function updateReadiness() {

    if (!trips.length) {

        document.getElementById(
            "readinessValue"
        ).textContent =
        "0%";

        document.getElementById(
            "readinessBar"
        ).style.width =
        "0%";

        return;
    }

    const averageScore =
    Math.floor(

        trips.reduce(
            (sum, trip) =>
            sum +
            trip.readiness,
            0
        ) / trips.length

    );

    document.getElementById(
        "readinessValue"
    ).textContent =
    averageScore + "%";

    document.getElementById(
        "readinessBar"
    ).style.width =
    averageScore + "%";

}

// =========================
// UPCOMING TRIPS
// =========================

function loadUpcomingTrips() {

    const container =
    document.getElementById(
        "upcomingTrips"
    );

    container.innerHTML = "";

    const upcomingTrips =
    trips.filter(
        trip =>
        trip.status !==
        "Completed"
    );

    if (
        upcomingTrips.length === 0
    ) {

        container.innerHTML =
        `
        <p>
            No trips yet.
            Create your first trip.
        </p>
        `;

        return;
    }

    upcomingTrips
    .slice(0, 3)
    .forEach(trip => {

        container.innerHTML +=

        `
        <div class="trip-card">

            <h3>
                ${trip.country}
            </h3>

            <p>
                📅 ${trip.startDate}
                -
                ${trip.endDate}
            </p>

            <p>
                👥 ${trip.travelers}
            </p>

            <p>
                Readiness:
                ${trip.readiness}%
            </p>

            <span class="badge">
                ${trip.status}
            </span>

            <br><br>

            <a
                href="trip-details.html"
                onclick="
                localStorage.setItem(
                'selectedTrip',
                '${trip.id}'
                )"
                class="btn-primary"
                style="
                text-decoration:none;
                "
            >
                View
            </a>

        </div>
        `;
    });

}

// =========================
// LOGOUT
// =========================

document
.getElementById(
    "logoutBtn"
)
.addEventListener(
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

// =========================
// INITIALIZE
// =========================

updateStats();
updateReadiness();
loadUpcomingTrips();