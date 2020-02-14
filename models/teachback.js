const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teachbackSchema = new Schema({
  candidateName: { type: String, required: true },
  role: { type: String, required: true },
  university: { type: String, required: true },
  programType: { type: String, required: true },
  reviewedBy: { type: String, required: true },
  submittedBy: { type: String, required: true },
  zoomLink: { type: String, required: true },
  cohortStartDate: Date,
  submitterScores: [String],
  reviewerScores: [String],
  submitterResult: String,
  reviewerResult: String,
  notesVerified: [Boolean]
});

const Teachback = mongoose.model("Teachback", teachbackSchema);

module.exports = Teachback;
