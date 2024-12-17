const db = require("./db.js");
const fs = require("fs");

try {
	// First we will test the reading and writing function of our db
	result1 = writeTest();

  // We need to check if it was successfull else we throw an error
	if (result1 === -1) {
		throw new Error("An error occured in writing or reading the database");
	}

  // Second we test the ablity to find a user by knowing their id
	result2 = findByTest(result1);

  // We need to check if it was successfull else we throw an error
	if (result2 === -1) {
		throw new Error("An error occured in finding by id");
	}

  // Third we test to see if it is able to update a record in the database
	result3 = updateTest();

  // We need to check if it was successfull else we throw an error
	if (result3 === -1) {
		throw new Error("An error occured in updating the database");
	}

  fs.unlinkSync("db.test.json")
  // If everything is successfull without any error we print that the tests where a success
	console.log("The db tests completed without any error");
} catch (error) {
	console.error("The database tests failed", error);
}

// Tests if the db can update a record
function updateTest() {
	try {
		const updatedUser = {
			id: 1,
			name: "John Foe",
		};
		db.updateDB(updatedUser, "db.test.json");
		console.log("Updated data in the db\n");
		return 1;
	} catch (error) {
		console.error(error);
		return -1;
	}
}

// Tests if the db is able to find a user by their id
function findByTest(users) {
	try {
		console.log(users);
		user = db.findById(users, 1);

		console.log(user);

		if (!user.id === 1 || user.name !== "John Doe") {
			throw new Error("Couldnt find a user by id or found wrong user");
		}
	} catch (error) {
		console.error(error);
		return -1;
	}
}

// Tests to see if we can read and write records to the db
function writeTest() {
	try {
		const user = {
			id: db.findValidId([]),
			name: "John Doe",
			email: "johndoe@example.com",
		};

		const users = [];

		users.push(user);

		db.writeDB(JSON.stringify(users, null, 2), "db.test.json");

		console.log("Users saved to test db");

		const data = JSON.parse(db.readDB("db.test.json"));

		console.log(data);

		const newUser = {
			id: db.findValidId(data),
			name: "John Joe",
			email: "johndoe@trythis.com",
		};

		users.push(newUser);

		db.writeDB(JSON.stringify(users, null, 2), "db.test.json");

		console.log("Wrote new user data to db");

		return users;
	} catch (err) {
		console.error(err);
		return -1;
	}
}
