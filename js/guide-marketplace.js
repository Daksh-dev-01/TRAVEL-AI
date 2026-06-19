const guides = [

{
id:1,
name:"Jean Martin",
country:"France",
languages:["English","French"],
rating:4.9,
experience:"8 Years",
rate:120
},

{
id:2,
name:"Akira Sato",
country:"Japan",
languages:["English","Japanese"],
rating:4.8,
experience:"6 Years",
rate:90
},

{
id:3,
name:"Maria Rossi",
country:"Italy",
languages:["English","Italian"],
rating:4.7,
experience:"10 Years",
rate:110
}

];

const container =
document.getElementById(
"guidesContainer"
);

guides.forEach(guide=>{

container.innerHTML +=

`
<div class="guide-card">

<h3>${guide.name}</h3>

<p>
Country:
${guide.country}
</p>

<p>
Languages:
${guide.languages.join(", ")}
</p>

<p>
⭐ ${guide.rating}
</p>

<p>
Experience:
${guide.experience}
</p>

<p>
$${guide.rate}/day
</p>

<button
class="btn-primary hireBtn"
data-id="${guide.id}"
>

Hire Guide

</button>

<button
class="btn-primary"
onclick="
window.open(
'https://wa.me/123456789'
)
"
>

WhatsApp

</button>

</div>
`;

});

const trips =
JSON.parse(
localStorage.getItem(
"trips"
)
) || [];

const latestTrip =
trips[trips.length-1];

if(latestTrip){

document.getElementById(
"recommendedGuide"
).textContent =

`${guides[0].name}
recommended for
${latestTrip.country}`;

}

document
.querySelectorAll(
".hireBtn"
)
.forEach(btn=>{

btn.addEventListener(
"click",
()=>{

let hired =
JSON.parse(
localStorage.getItem(
"hiredGuides"
)
)||[];

hired.push(
btn.dataset.id
);

localStorage.setItem(
"hiredGuides",
JSON.stringify(
hired
)
);

alert(
"Guide hired!"
);

});

});