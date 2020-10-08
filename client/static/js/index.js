// CHECK IF NOTHING IS WRONG
console.log("connected");
// DOM elements
const viewBtn = document.querySelector("#getdata");
const form = document.querySelector("#doc__form");
const appSection = document.querySelector("#appointment");
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
	document.querySelector(".app").innerHTML = `<div class="app__header">
					<h1>Yet to be named Clinic</h1>
				</div>`;

	let markup = `
			<ul class="app__details">
				<li class="app__item app__item-1">
					<span class="name"> Name of the Patient : </span>
					<span class="value">${application.patient}</span>
				</li>
				<li class="app__item app__item-2">
					<span class="name">Name of the Applicant : </span>
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
	let pname, aname;
	pname = prompt("\nEnter the name of the patient : (Case sensitive)\n");
	aname = prompt("\nEnter the name of the Applicant : (Case sensitive)\n");
	fetch(`/getdata?patient=${pname}&applicant=${aname}`)
		.then((response) => response.json())
		.then((json) => {
			application = json;
			console.log(application);
			insertMarkup();
			appSection.style.display = "block";
			appSection.scrollIntoView();
		})
		.catch((err) => console.log(err));
});
