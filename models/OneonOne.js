const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OneonOneSchema = new Schema({
  candidateName: { type: String, required: true },
  role: { type: String, required: true },
  university: { type: String, required: true },
  programType: { type: String, required: true },
  reviewedBy: { type: String, required: true },
  submittedBy: { type: String, required: true },
  zoomLink: { type: String, required: true },
  cohortStartDate: Date,
  submitterScores: [String],
  submitterResult: String,
  reviewerScores: [String],
  reviewerResult: String,
  reviewerRationale: String,
  reviewerRecommendations: String,
  notesIncluded: [String],
  isVisible: String,
});

const OneonOne = mongoose.model("OneonOne", OneonOneSchema);

module.exports = OneonOne;
