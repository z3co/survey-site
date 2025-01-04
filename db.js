const fs = require("fs");

function readDB(nameDB) {
	try {
		const data = fs.readFileSync(nameDB, "utf8");
		if (data === null) {
			return [];
		}
		return JSON.parse(data);
	} catch (err) {
		console.error("Failed to read data", err);
		return [];
	}
}

function writeDB(data, nameDB) {
	if (!data) return console.log("No data found");
	try {
		fs.writeFileSync(nameDB, JSON.stringify(data));
		console.log("Data saved to DB");
		return 201;
	} catch (error) {
		console.error("Failed to write data to db", error);
	}
}

function updateDB(updatedData, nameDB, uniqueIdentifier = "id") {
	const existingData = JSON.parse(readDB(nameDB));

	if (!existingData) {
		console.error("No existing data found");
		return;
	}
	const indexToUpdate = existingData.findIndex(
		(record) => record[uniqueIdentifier] === updatedData[uniqueIdentifier],
	);

	if (indexToUpdate === -1) {
		console.error("Record not found for update");
		return;
	}
	existingData[indexToUpdate] = {
		...existingData[indexToUpdate],
		...updatedData,
	};
	writeDB(existingData, nameDB);
}

function findValidId(data) {
	if (!data) {
		console.error("There is no data");
	}
	let largest = 0;
	for (let i = 0; i < data.length; i++) {
		if (data[i].id > largest) {
			largest = data[i].id;
		}
	}
	return largest + 1;
}

function findById(data, id, uniqueIdentifier = "id") {
	if (!data) {
		console.error("Data is null, provide valid data for finding id");
	}
	try {
		let user = null;
		for (let i = 0; i < data.length; i++) {
			if (data[i].id === id) {
				user = data[i];
			}
		}
		return user;
	} catch (error) {
		console.error("An error occured while finding data by id");
		return null;
	}
}

module.exports = { readDB, writeDB, updateDB, findValidId, findById };
