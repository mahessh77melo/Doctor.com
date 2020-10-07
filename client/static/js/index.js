console.log("connected");
const viewBtn = document.querySelector("#getdata");
const form = document.querySelector("#doc__form");
viewBtn.addEventListener("click", () => {
	let pname, aname;
	pname = prompt("Name of the patient:  ");
	aname = prompt("Name of the applicant : ");
	fetch(`/getdata?patient=${pname}&applicant=${aname}`)
		.then((response) => response.json())
		.then((json) => console.log(json))
		.catch((err) => console.log(err));
});
