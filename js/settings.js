const settings =
JSON.parse(
localStorage.getItem(
"settings"
)
) || {};

document.getElementById(
"theme"
).value =
settings.theme ||
"Light";

document.getElementById(
"currency"
).value =
settings.currency ||
"INR";

document.getElementById(
"language"
).value =
settings.language ||
"English";

document.getElementById(
"notifications"
).checked =
settings.notifications ||
false;

document.getElementById(
"saveSettings"
)
.addEventListener(
"click",
()=>{

const newSettings = {

theme:
document.getElementById(
"theme"
).value,

currency:
document.getElementById(
"currency"
).value,

language:
document.getElementById(
"language"
).value,

notifications:
document.getElementById(
"notifications"
).checked

};

localStorage.setItem(
"settings",
JSON.stringify(
newSettings
)
);

if(
newSettings.theme
===
"Dark"
){

document.body.classList.add(
"dark-mode"
);

}else{

document.body.classList.remove(
"dark-mode"
);

}

alert(
"Settings Saved"
);

}
);