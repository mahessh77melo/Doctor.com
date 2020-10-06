console.log("connected");
const viewBtn = document.querySelector("#getdata");
const form = document.querySelector("#doc__form");
viewBtn.addEventListener("click", () => {
	fetch("/getdata")
		.then((response) => response.json())
		.then((json) => console.log(json))
		.catch((err) => console.log(err));
});
