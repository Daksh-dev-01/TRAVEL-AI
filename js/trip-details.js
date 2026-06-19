```javascript
// =========================
// AUTH CHECK
// =========================

if (
    localStorage.getItem("loggedIn") !== "true"
) {
    window.location.href = "login.html";
}

// =========================
// LOGOUT
// =========================

const logoutBtn =
document.getElementById("logoutBtn");

if (logoutBtn) {

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
// LOAD TRIP
// =========================

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

let trip =
trips.find(
    t => String(t.id) === String(tripId)
);

// fallback

if (!trip) {

    document.body.innerHTML =
    `
    <h1 style="padding:40px;">
        Trip Not Found
    </h1>
    `;

    throw new Error(
        "Trip not found"
    );

}

// =========================
// DEFAULT DATA
// =========================

if (!trip.itineraryData) {

    trip.itineraryData = [

        {
            day: 1,
            activities: [
                {
                    time: "09:00",
                    activity: "Arrival",
                    location: "Airport"
                }
            ]
        }

    ];
}

if (!trip.documents) {
    trip.documents = [];
}

if (!trip.budgetBreakdown) {

    trip.budgetBreakdown = {

        flights: 25000,
        hotels: 30000,
        food: 10000,
        activities: 8000,
        transport: 5000

    };

}

saveTrip();

// =========================
// TAB SYSTEM
// =========================

const tabButtons =
document.querySelectorAll(
    ".tab-btn"
);

const tabContents =
document.querySelectorAll(
    ".tab-content"
);

tabButtons.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            tabButtons.forEach(
                b => b.classList.remove(
                    "active"
                )
            );

            tabContents.forEach(
                c => c.classList.remove(
                    "active"
                )
            );

            btn.classList.add(
                "active"
            );

            document
            .getElementById(
                btn.dataset.tab
            )
            .classList.add(
                "active"
            );

        }
    );

});

// =========================
// OVERVIEW
// =========================

document.getElementById(
    "tripTitle"
).textContent =
trip.country ||
trip.destination ||
"Trip";

document.getElementById(
    "overviewDestination"
).textContent =
trip.country ||
trip.destination ||
"-";

document.getElementById(
    "overviewDates"
).textContent =
`${trip.startDate} → ${trip.endDate}`;

document.getElementById(
    "overviewTravelers"
).textContent =
trip.travelers || "-";

document.getElementById(
    "overviewBudget"
).textContent =
trip.budgetType || "-";

document.getElementById(
    "overviewStatus"
).textContent =
trip.status || "-";

document.getElementById(
    "overviewReadiness"
).textContent =
trip.readiness + "%";

// =========================
// BUDGET
// =========================

document.getElementById(
    "flightCost"
).textContent =
"₹" +
trip.budgetBreakdown.flights;

document.getElementById(
    "hotelCost"
).textContent =
"₹" +
trip.budgetBreakdown.hotels;

document.getElementById(
    "foodCost"
).textContent =
"₹" +
trip.budgetBreakdown.food;

document.getElementById(
    "activityCost"
).textContent =
"₹" +
trip.budgetBreakdown.activities;

document.getElementById(
    "transportCost"
).textContent =
"₹" +
trip.budgetBreakdown.transport;

const totalBudget =
trip.budgetBreakdown.flights +
trip.budgetBreakdown.hotels +
trip.budgetBreakdown.food +
trip.budgetBreakdown.activities +
trip.budgetBreakdown.transport;

document.getElementById(
    "totalCost"
).textContent =
"₹" + totalBudget;

// =========================
// SURVIVAL KIT
// =========================

document.getElementById(
    "currencyInfo"
).textContent =
"Local Currency";

document.getElementById(
    "emergencyInfo"
).textContent =
"112";

document.getElementById(
    "plugInfo"
).textContent =
"Type C / Type F";

document.getElementById(
    "esimInfo"
).textContent =
"Airalo, Nomad";

document.getElementById(
    "transportCardInfo"
).textContent =
"Metro Pass Available";

document.getElementById(
    "appsInfo"
).textContent =
"Google Maps, Uber, Translate";

// =========================
// ITINERARY
// =========================

const itineraryContainer =
document.getElementById(
    "itineraryContainer"
);

function renderItinerary() {

    itineraryContainer.innerHTML = "";

    trip.itineraryData.forEach(
        (dayObj, dayIndex) => {

            const dayCard =
            document.createElement(
                "div"
            );

            dayCard.className =
            "day-card";

            dayCard.innerHTML =
            `
            <h3>
                Day ${dayObj.day}
            </h3>

            <br>

            <div id="day-${dayIndex}">
            </div>

            <button
            class="btn-primary addActBtn"
            data-day="${dayIndex}">
            Add Activity
            </button>
            `;

            itineraryContainer.appendChild(
                dayCard
            );

            const dayContainer =
            dayCard.querySelector(
                `#day-${dayIndex}`
            );

            dayObj.activities.forEach(
                (
                    activity,
                    activityIndex
                ) => {

                    const row =
                    document.createElement(
                        "div"
                    );

                    row.className =
                    "activity-row";

                    row.draggable =
                    true;

                    row.dataset.day =
                    dayIndex;

                    row.dataset.index =
                    activityIndex;

                    row.innerHTML =
                    `
                    <input
                    value="${activity.time}"
                    class="timeInput">

                    <input
                    value="${activity.activity}"
                    class="activityInput">

                    <input
                    value="${activity.location}"
                    class="locationInput">

                    <button
                    class="delete-activity">
                    Delete
                    </button>
                    `;

                    dayContainer.appendChild(
                        row
                    );

                }
            );

        }
    );

    attachActivityEvents();

}

renderItinerary();

// =========================
// ADD ACTIVITY
// =========================

document.getElementById(
    "addActivityBtn"
)
.addEventListener(
    "click",
    () => {

        trip.itineraryData[0]
        .activities.push({

            time: "10:00",

            activity:
            "New Activity",

            location:
            "Location"

        });

        saveTrip();

        renderItinerary();

    }
);

// =========================
// ACTIVITY EVENTS
// =========================

function attachActivityEvents() {

    document
    .querySelectorAll(
        ".delete-activity"
    )
    .forEach(btn => {

        btn.addEventListener(
            "click",
            e => {

                const row =
                e.target.closest(
                    ".activity-row"
                );

                const day =
                Number(
                    row.dataset.day
                );

                const index =
                Number(
                    row.dataset.index
                );

                trip.itineraryData[
                    day
                ].activities.splice(
                    index,
                    1
                );

                saveTrip();

                renderItinerary();

            }
        );

    });

    document
    .querySelectorAll(
        ".activity-row input"
    )
    .forEach(input => {

        input.addEventListener(
            "change",
            saveInputs
        );

    });

    dragAndDrop();

}

// =========================
// SAVE INPUTS
// =========================

function saveInputs() {

    document
    .querySelectorAll(
        ".activity-row"
    )
    .forEach(row => {

        const day =
        Number(
            row.dataset.day
        );

        const index =
        Number(
            row.dataset.index
        );

        trip.itineraryData[
            day
        ].activities[index] = {

            time:
            row.querySelector(
                ".timeInput"
            ).value,

            activity:
            row.querySelector(
                ".activityInput"
            ).value,

            location:
            row.querySelector(
                ".locationInput"
            ).value

        };

    });

    saveTrip();

}

// =========================
// DRAG DROP
// =========================

function dragAndDrop() {

    let dragged = null;

    document
    .querySelectorAll(
        ".activity-row"
    )
    .forEach(row => {

        row.addEventListener(
            "dragstart",
            () => {

                dragged = row;

            }
        );

        row.addEventListener(
            "dragover",
            e => {

                e.preventDefault();

            }
        );

        row.addEventListener(
            "drop",
            () => {

                if(
                    dragged &&
                    dragged !== row
                ){

                    row.parentNode
                    .insertBefore(
                        dragged,
                        row
                    );

                    saveInputs();

                }

            }
        );

    });

}

// =========================
// DOCUMENTS
// =========================

const upload =
document.getElementById(
    "documentUpload"
);

const documentList =
document.getElementById(
    "documentsList"
);

function renderDocuments() {

    documentList.innerHTML =
    "";

    trip.documents.forEach(
        (
            doc,
            index
        ) => {

            const div =
            document.createElement(
                "div"
            );

            div.className =
            "document-item";

            div.innerHTML =
            `
            📄 ${doc.name}

            <button
            style="
            float:right;
            background:red;
            color:white;
            border:none;
            padding:5px 10px;
            border-radius:5px;
            "
            onclick="
            deleteDocument(
            ${index}
            )
            ">
            Delete
            </button>
            `;

            documentList.appendChild(
                div
            );

        }
    );

}

renderDocuments();

upload.addEventListener(
    "change",
    e => {

        const file =
        e.target.files[0];

        if(!file) return;

        const reader =
        new FileReader();

        reader.onload =
        function(){

            trip.documents.push({

                name:file.name,

                data:
                reader.result

            });

            saveTrip();

            renderDocuments();

        };

        reader.readAsDataURL(
            file
        );

    }
);

window.deleteDocument =
function(index){

    trip.documents.splice(
        index,
        1
    );

    saveTrip();

    renderDocuments();

};

// =========================
// AI UPDATE ACTIONS
// =========================

document
.querySelectorAll(
    ".accept-btn"
)
.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            alert(
                "Alternative accepted."
            );

        }
    );

});

document
.querySelectorAll(
    ".reject-btn"
)
.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            alert(
                "Suggestion rejected."
            );

        }
    );

});

// =========================
// SAVE
// =========================

function saveTrip() {

    const index =
    trips.findIndex(
        t =>
        String(t.id)
        ===
        String(trip.id)
    );

    trips[index] = trip;

    localStorage.setItem(
        "trips",
        JSON.stringify(trips)
    );

}
```
