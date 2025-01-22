const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const display = document.querySelector(".error");

form.addEventListener("submit", async (e) => {
	e.preventDefault();
	display.textContent = "";

	try {
		res = await fetch("/api/routes/login", {
			method: "POST",
			credentials: "include",
			body: JSON.stringify({
				username: username.value,
				password: password.value,
			}),
			headers: { "Content-Type": "application/json" },
		});
		const data = await res.json();
		if (res.status === 400 || res.status === 401) {
			return (display.textContent = `${data.message}. ${
				data.error ? data.error : ""
			}`);
		}
		location.assign("/surveyname");
	} catch (error) {
		console.error(err.message);
	}
});
