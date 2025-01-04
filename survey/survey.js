const Survey = require("../models/survey");
const db = require("../db.js");

exports.create = async (req, res, next) => {
	const { name, questions, userId, date } = req.body;

	try {
		const data = db.readDB("surveyDB.json");
		if (!name || !questions || !userId || !date) {
			throw new Error("Not enough data provided");
		}
		const newSurvey = new Survey(
			db.findValidId(data),
			userId,
			questions,
			name,
			date,
		);

		data.push(newSurvey);

		db.writeDB(data, "surveyDB.json");

		res.status(201).json({
			message: "Survey created successfully",
			survey: newSurvey.id,
		});
	} catch (error) {
		console.error("Error creating a new survey");
		res.status(400).json({
			message: "Error creating survey",
			error: error.message,
		});
	}
};

exports.getAll = async (req, res, next) => {
	try {
		const surveys = db.readDB("surveyDB.json");

		res.status(200).json({
			message: "Got all surveys successfully",
			surveys: surveys,
		});
	} catch (error) {
		console.error("Error getting or sending all surveys");
		res.status(400).json({
			message: "Error retriving all surveys",
			error: error.message,
		});
	}
};

exports.getOne = async (req, res, next) => {
	const { surveyId } = req.body;
	try {
		const data = db.readDB("surveyDB.json");

		const survey = db.findById(data, surveyId);

		if (survey === null) {
			throw new Error("Could not find a user with that id");
		}

		res.status(200).json({
			message: "Succesfully found a survey matching the id",
			survey: survey,
		});
	} catch (error) {
		console.error("Error getting or sending survey");
		res.status(400).json({
			message: "Error retriving survey",
			error: error.message,
		});
	}
};
