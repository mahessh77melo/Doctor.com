// CHECK IF NOTHING IS WRONG
console.log("connected");
// DOM elements
const viewBtn = document.querySelector("#getdata");
const form = document.querySelector("#doc__form");
const appSection = document.querySelector("#appointment");
const landerSection = document.querySelector("#lander");
const aboutSection = document.querySelector("#about");
const contactSection = document.querySelector("#contact");
// fetch request variable for the application
let application;

// utility function for date parsing
const dateParser = (realDate) => {
	const date = new Date(realDate);
	return date.toString().split("GMT")[0];
};
// markup inserting
const insertMarkup = () => {
	// clearing the previous application (if any)
	document.querySelector(".app").innerHTML = ``;

	let markup = `
			<div class="app__header">
					<h1>Smile Fix dental Care, Vandalur</h1>
			</div>
			<ul class="app__details">
				<li class="app__item app__item-1">
					<span class="name"> Name of the Patient : </span>
					<span class="value">${application.patient}</span>
				</li>
				<li class="app__item app__item-2">
					<span class="name">Contact of the Applicant : </span>
					<span class="value">${application.applicant}</span>
				</li>
				<li class="app__item app__item-3">
					<span class="name">Age of the Patient : </span
					><span class="value">${application.age}</span>
				</li>
				<li class="app__item app__item-4">
					<span class="name">Date of Appointment : </span
					><span class="value">${application.date.split("T")[0]}</span>
				</li>
				<li class="app__item app__item-5">
					<span class="name">Applied at : </span
					><span class="value">${dateParser(application.createdAt)}</span>
				</li>
			</ul>
	`;

	document.querySelector(".app").insertAdjacentHTML("beforeend", markup);
};
viewBtn.addEventListener("click", () => {
	let pname, anumber;
	/* pname = prompt("\nEnter the full name of the patient : (Case sensitive)\n");
	anumber = prompt(
		"\nEnter the registered contact number : (Applicant/Guardian)\n"
	);
	fetch(`/getdata?patient=${pname}&applicant=${anumber.toString()}`) */ fetch(
		"/getdata?patient=tester&applicant=9999977777"
	)
		.then((response) => response.json())
		.then((json) => {
			application = json;
			console.log(application);
			// Only insert the application into the dom if there is a valid returned value.
			if (application) {
				insertMarkup();
				appSection.style.display = "block";
				appSection.scrollIntoView();
			} else {
				// Alert the user that the given values are wrong
				alert(
					"The application doesn't exist! Kindly double-check the details."
				);
			}
		})
		.catch((err) => console.log(err));
});

// scroll functions
const goHome = () => {
	landerSection.scrollIntoView();
};
const goAbout = () => {
	aboutSection.scrollIntoView();
};
const goContact = () => {
	contactSection.scrollIntoView();
};
const goForm = () => {
	document.querySelector("#name-pat").focus(); // Focus on the first input field
	form.scrollIntoView();
};
