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
