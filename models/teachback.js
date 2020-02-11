const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teachbackSchema = new Schema({
  candidateName: { type: String, required: true },
  role: { type: String, required: true },
  university: { type: String, required: true },
  programType: { type: String, required: true },
  reviewedBy: { type: String },
  submittedBy: { type: String, required: true },
  zoomLink: { type: String, required: true },
  cohortStartDate: { type: Date },
  alreadyReviewed: { type: Boolean, default: false },
  submitterScores: {
    positivity: { type: Number, min: 1, max: 4 },
    investment: { type: Number, min: 1, max: 4 },
    pace: { type: Number, min: 1, max: 4 },
    clarity: { type: Number, min: 1, max: 4 },
    knowledge: { type: Number, min: 1, max: 4 },
    responses: { type: Number, min: 1, max: 4 },
    industryKnowledge: { type: Number, min: 1, max: 4 },
    coachability: { type: Number, min: 1, max: 4 }
  },
  reviewerScores: {
    positivity: { type: Number, min: 1, max: 4 },
    investment: { type: Number, min: 1, max: 4 },
    pace: { type: Number, min: 1, max: 4 },
    clarity: { type: Number, min: 1, max: 4 },
    knowledge: { type: Number, min: 1, max: 4 },
    responses: { type: Number, min: 1, max: 4 },
    industryKnowledge: { type: Number, min: 1, max: 4 },
    coachability: { type: Number, min: 1, max: 4 }
  },
  submitterResult: String,
  reviewerResult: String,
  notesVerified: [Boolean]
});

const Teachback = mongoose.model("Teachback", teachbackSchema);

module.exports = Teachback;
