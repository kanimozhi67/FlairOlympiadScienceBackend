import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    index: true,
  },

  a: Number,
  b: Number,
  operator: String,
mul: { type: Number },
skip: { type: Number },

answerarr: {
  type: [Number], // array of numbers
},

 kind: {
  type: String,
  required: true,
  default: "general", // ✅ prevents crash
},
  answer:  Number,
answerString:String,
 answerStringArr: mongoose.Schema.Types.Mixed,


  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now,
    expires: 9000, // ⏰ auto delete after 150 minutes
  },
});

export default mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
