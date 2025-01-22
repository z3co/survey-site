const surveyName = document.querySelector("#survey-name");
const submit = document.querySelector("form");
const display = document.querySelector(".success");
const search = document.querySelector(".search");

if (sessionStorage.getItem("created-survey") === "true") {
	display.textContent =
		"Successfully created your survey would you like to make another?";
}

search.addEventListener("click", (e) => {
	e.preventDefault();
	location.assign("/search");
});

submit.addEventListener("submit", async (e) => {
	e.preventDefault();

	sessionStorage.setItem("survey-name", surveyName.value);

	location.assign("/survey");
});
