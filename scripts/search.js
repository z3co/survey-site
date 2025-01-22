const display = document.querySelector(".display");
const ul = document.querySelector("ul");
const search = document.querySelector(".search");
const getUsers = async () => {
	const res = await fetch("/api/surveys/surveys");
	const data = await res.json();
	console.log("Hello world", data.surveys);
	data.surveys.map((survey) => {
		const li = `<li> <b>Name:</b> ${survey.name} <br> <b>User:</b> ${survey.username} </li> <button class="play">play</button>`;
		ul.innerHTML += li;
	});
	const play = document.querySelectorAll(".play");
	play.forEach((button, i) => {
		button.addEventListener("click", async () => {
			display.textContent = "";
			const id = data.surveys[i].id;
			location.assign(`/answer?survey=${id}`);
		});
	});
};
search.addEventListener("click", (e) => {
	e.preventDefault();
	location.assign("/surveyname");
});
getUsers();
