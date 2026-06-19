const trips =
JSON.parse(
localStorage.getItem(
"trips"
)
)||[];

const completed =
trips.filter(
t=>t.status==="Completed"
);

document.getElementById(
"profileTrips"
).textContent =
completed.length;

document.getElementById(
"profileCountries"
).textContent =

new Set(
completed.map(
t=>t.country
)
).size;

document.getElementById(
"profileSaved"
).textContent =

"₹" +
(
completed.length * 5000
);

const guides =
JSON.parse(
localStorage.getItem(
"hiredGuides"
)
)||[];

document.getElementById(
"profileGuides"
).textContent =
guides.length;

document.getElementById(
"achievements"
).innerHTML =

`
🏆 Explorer Level ${Math.max(1,completed.length)}

<br><br>

🌎 Countries:
${new Set(
completed.map(
t=>t.country
)
).size}

<br><br>

✈ Total Trips:
${completed.length}
`;