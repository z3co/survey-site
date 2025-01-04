function Survey(id, user_id, questions, name, date) {
	this.id = id;
	this.user_id = user_id;
	this.questions = questions;
	this.name = name;
	this.date = date;
}

module.exports = Survey;
