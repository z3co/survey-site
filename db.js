const fs = require("fs");

function readDB(nameDB) {
	try {
		const data = fs.readFileSync(nameDB, "utf8");
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
	} catch (error) {
		console.error("Failed to write data to db", error);
	}
}

function updateDB(updatedData, nameDB, uniqueIdentifier = "id") {
	const existingData = readDB(nameDB);

	if (!existingData) {
		console.error("No existing data found");
		return;
	}
	const indexToUpdate = existingData.findindex(
		(record) => record[uniqueIdentifier] === updatedRecord[uniqueIdentifier],
	);

	if (indexToUpdate === -1) {
		console.error("Record not found for update");
		return;
	}
	existingData[indexToUpdate] = {
		...existingData[indexToUpdate],
		...updatedRecord,
	};
	writeDB(existingData, nameDB);
}

function findValidId(nameDB) {
	if (!data) {
		console.error("There is no data");
	}
	let largest = 0;
	for (let i = 0; i < data.length; i++) {
		if (data[i].id > data.length) {
			largest = data[i].id;
		}
	}
	return largest + 1;
}

function findById(data, id) {
	if (!data) {
		console.error("Data is null, provide valid data for finding id");
	}
	try {
		const user = data.findindex((record) => record[uniqueIdentifier] === id);
		if (user === -1) {
			throw new Error(
				"The data you are looking for are not in the data you provided",
			);
		}
		return data[user];
	} catch (error) {
		console.error("An error occured while finding data by id");
		return null;
	}
}

module.exports = { readDB, writeDB, updateDB, findValidId, findById };
