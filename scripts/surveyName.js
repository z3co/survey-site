const surveyName = document.querySelector("#survey-name");
const submit = document.querySelector("form");
const display = document.querySelector('.success')

if (sessionStorage.getItem("created-survey") === "true") {
  display.textContent = "Successfully created your survey would you like to make another?"
  
}

submit.addEventListener("submit", async (e) => {
	e.preventDefault();

	sessionStorage.setItem("survey-name", surveyName.value);

	location.assign("/survey");
});
