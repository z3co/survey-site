const display = document.querySelector(".display");
const question = document.querySelector(".question");
const answer = document.querySelector("#answer");
const form = document.querySelector("form");
const surveyId = Number(getUrlParams("survey"));
const survey = getQuestion(surveyId);
const number = document.querySelector('.number');


async function getQuestion(surveyId) {
	try {
		res = await fetch("/api/surveys/get", {
			method: "GET",
			credentials: "include",
			body: JSON.stringify({
				surveyId: surveyId,
			}),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (res.status === 400 || res.status === 401) {
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
		const pair = params[i].split("=");
		if (pair[0] === target) {
			return pair[1];
		}
	}
	return "NaN";
}

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	display.textcontent = "";
});
