if(
document.getElementById(
"tripForm"
)
){

document
.getElementById(
"tripForm"
)
.addEventListener(
"submit",
function(e){

e.preventDefault();

const interests =
[
...document.querySelectorAll(
'input[type="checkbox"]:checked'
)
]
.map(
x=>x.value
);

const trip = {

id: Date.now(),

homeCity:
document.getElementById(
"homeCity"
).value,

departureAirport:
document.getElementById(
"departureAirport"
).value,

railwayStation:
document.getElementById(
"railwayStation"
).value,

busStation:
document.getElementById(
"busStation"
).value,

customStart:
document.getElementById(
"customStart"
).value,

country:
document.getElementById(
"country"
).value,

cities:
document.getElementById(
"cities"
).value,

startDate:
document.getElementById(
"startDate"
).value,

endDate:
document.getElementById(
"endDate"
).value,

budgetType:
document.getElementById(
"budgetType"
).value,

budget:
document.getElementById(
"customBudget"
).value,

travelers:
document.getElementById(
"travelers"
).value,

interests,

cuisine:
document.getElementById(
"cuisine"
).value,

religion:
document.getElementById(
"religion"
).value,

transport:
document.getElementById(
"transport"
).value,

eco:
document.getElementById(
"eco"
).checked,

guide:
document.getElementById(
"guide"
).checked,

status:"Planned",

readiness:
Math.floor(
Math.random()*21
)+80

};

localStorage.setItem(
"currentTripDraft",
JSON.stringify(trip)
);

window.location.href =
"ai-analysis.html";
}
);

}

// ======================
// AI ANALYSIS
// ======================

if(
document.getElementById(
"steps"
)
){

const steps = [

"Fetching weather",

"Checking attraction timings",

"Finding hidden gems",

"Optimizing routes",

"Calculating budget",

"Selecting guides",

"Generating itinerary"

];

let index = 0;

const container =
document.getElementById(
"steps"
);

const interval =
setInterval(()=>{

const div =
document.createElement(
"div"
);

div.className =
"step active";

div.innerHTML =
steps[index];

container.appendChild(
div
);

if(index > 0){

container.children[
index-1
]
.className =
"step done";
}

index++;

if(index === steps.length){

clearInterval(
interval
);

setTimeout(()=>{

const trip =
JSON.parse(
localStorage.getItem(
"currentTripDraft"
)
);

trip.itinerary = [

"Day 1 - Arrival & City Tour",

"Day 2 - Major Attractions",

"Day 3 - Hidden Gems",

"Day 4 - Local Cuisine Experience",

"Day 5 - Shopping & Departure"

];

const trips =
JSON.parse(
localStorage.getItem(
"trips"
)
) || [];

trips.push(trip);

localStorage.setItem(
"trips",
JSON.stringify(trips)
);

localStorage.setItem(
"selectedTrip",
trip.id
);

window.location.href =
"trip-details.html";

},5000);

}

},800);

}