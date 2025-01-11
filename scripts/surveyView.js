const form = document.querySelector("form");
const question = document.querySelector("#question");
const answer = document.querySelector("#answer");
const number = document.querySelector(".number");
const display = document.querySelector(".error");
const submit = document.querySelector(".submit");
const survey = [];
const surveyMap = new Map();
const surveyName = sessionStorage.getItem("survey-name");
number.textContent = 1;

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	display.textContent = "";

	try {
		const newQuestion = {
			question: question.value,
			answer: answer.value,
			number: number.textContent,
		};

		number.textContent = survey.push(newQuestion) + 1;

		question.value = "";
		answer.value = "";
	} catch (error) {
		console.error(error);
	}
});

submit.addEventListener("click", async () => {
	display.textContent = "";

	try {
		res = await fetch("/api/surveys/create", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({
				name: surveyName,
				questions: survey,
				date: new Date(),
			}),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (res.status === 400 || res.status === 401) {
			return (display.textContent = `${data.message}. ${data.error ? data.error : ""}`);
		// biome-ignore lint/style/noUselessElse: <explanation>
		} else {
			console.log("Hello world");
      sessionStorage.setItem("created-survey", true)
      location.assign("/surveyname");
    }
	} catch (error) {
		console.error(error.message);
	}
});
