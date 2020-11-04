// CHECK IF EVERYTHING IS RIGHT
console.log("connected");
// DOM elements
const viewBtn = document.querySelector("#getdata");
const formSection = document.querySelector("#doc__form");
const appSection = document.querySelector("#appointment");
const landerSection = document.querySelector("#lander");
const aboutSection = document.querySelector("#about");
const contactSection = document.querySelector("#contact");
const modalFormSection = document.querySelector(".modal-form");
const overlay = document.querySelector(".overlay");
const closeModal = document.querySelector(".close-modal");
const navAbout = document.querySelector("#goAbout");
const navContact = document.querySelector("#goContact");
const footerHome = document.querySelector("#goHome");
const bookBtn = document.querySelector(".lander__plus");
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
	//  inserting the markup into the DOM
	document.querySelector(".app").insertAdjacentHTML("beforeend", markup);
};

// Modal form handling
const showModal = () => {
	document.querySelector("#modal-patient").value = "";
	document.querySelector("#modal-applicant").value = "";
	modalFormSection.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const hideModal = () => {
	modalFormSection.classList.add("hidden");
	overlay.classList.add("hidden");
};
// Event Listeners
viewBtn.addEventListener("click", showModal);
overlay?.addEventListener("click", hideModal);
closeModal?.addEventListener("click", hideModal);
document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		console.log("escape is pressed");
		hideModal();
	}
});

// Get appointment query details
const getForm = (e) => {
	console.log("called");
	e.preventDefault();
	const pname = document.querySelector("#modal-patient").value;
	const anumber = document.querySelector("#modal-applicant").value;
	pname &&
		anumber &&
		fetch(`/getdata?patient=${pname}&applicant=${anumber.toString()}`)
			.then((response) => response.json())
			.then((json) => {
				application = json;
				console.log(application);
				// Only insert the application into the dom if there is a valid returned value.
				if (application) {
					insertMarkup();
					appSection.style.display = "block";
					appSection.scrollIntoView();
					hideModal();
				} else {
					// Alert the user that the given values are wrong
					alert(
						"The application doesn't exist! Kindly double-check the details."
					);
				}
			})
			.catch((err) => console.log(err));
	return true;
};

// scroll functions
// Called via the HTML onclick functions
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
	// Focus on the first input field
	document.querySelector("#name-pat").focus();
	formSection.scrollIntoView();
};
// scroll event listeners
navAbout.addEventListener("click", goAbout);
navContact.addEventListener("click", goContact);
footerHome.addEventListener("click", goHome);
bookBtn.addEventListener("click", goForm);
