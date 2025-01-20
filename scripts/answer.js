const display = document.querySelector(".display");
const question = document.querySelector(".question");
const answer = document.querySelector("#answer");
const form = document.querySelector("form");
const surveyId = Number(getUrlParams("survey"));
const redirect = document.querySelector("#new");
const number = document.querySelector(".number");

(async () => {
	const survey = await getQuestion(surveyId);
	question.textContent = survey.questions[number.textContent - 1].question;
})();

if (number.textContent === "") {
	number.textContent = 1;
}

async function getQuestion(surveyId) {
	try {
		res = await fetch("/api/surveys/get", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({
				surveyId: surveyId,
			}),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (res.status === 400 || res.status === 401) {
			display.style.background = "red";
			return (display.textContent = `${data.message}. ${data.error ? data.error : ""}`);
		}
		return data.survey;
	} catch (error) {
		console.error(error);
	}
}

function getUrlParams(target) {
	const urlString = window.location.search.substring(1);
	const params = urlString.split("&");
	for (let index = 0; index < params.length; index++) {
		const pair = params[index].split("=");
		if (pair[0] === target) {
			return pair[1];
		}
	}
	return "NaN";
}

redirect.addEventListener("click", async (e) => {
	location.assign("/surveyname");
});

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	display.textcontent = "";
	const survey = await getQuestion(surveyId);
	if (survey.questions[number.textContent - 1].answer === answer.value) {
		display.style.background = "green";
		display.textContent = "Thats correct. Great job.";
		number.textContent = Number(number.textContent) + 1;
	} else {
		display.style.background = "red";
		display.textContent = "That is wrong, try again";
	}
	if (number.textContent > survey.questions.length) {
		display.textContent = "You finished the survey.";
		form.style.visibility = "hidden";
		redirect.style.visibility = "visible";
		sessionStorage.setItem("created-survey", false);
	}
});
