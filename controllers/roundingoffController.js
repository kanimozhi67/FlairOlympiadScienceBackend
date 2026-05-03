import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ---------------- HELPERS ---------------- */

// random number in range
const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// round logic
const roundTo = (num, place) => {
  if (place === 10) return Math.round(num / 10) * 10;
  if (place === 100) return Math.round(num / 100) * 100;
  if (place === 1000) return Math.round(num / 1000) * 1000;
};

/* ---------------- QUESTION GENERATOR ---------------- */

const generateRoundingQuestion = () => {
  const types = ["ten", "hundred", "thousand"];
  const type = types[Math.floor(Math.random() * types.length)];

  let number, place, label;

  if (type === "ten") {
    number = random(10, 99999);
    place = 10;
    label = "nearest Ten";
  }

  if (type === "hundred") {
    number = random(100, 99999);
    place = 100;
    label = "nearest Hundred";
  }

  if (type === "thousand") {
    number = random(1000, 999999);
    place = 1000;
    label = "nearest Thousand";
  }

  const answer = roundTo(number, place);

  return {
    question: `Round off ${number.toLocaleString()} to the ${label}.`,
    answer,
  };
};

/* ---------------- GENERATE API ---------------- */

export async function genRoundingQuiz(req, res) {
  try {
    const questions = [];

    for (let i = 0; i < 6; i++) {
      const q = generateRoundingQuestion();
      const id = uuidv4();

      await Quiz.create({
        id,
        question: q.question,
        answer: q.answer,
        createdAt: new Date(),
      });

      questions.push({
        id,
        question: q.question,
        answer: q.answer,
      });
    }

    console.log("Generated Rounding Questions:", questions);

    res.json({ questions });
  } catch (err) {
    console.error("Generate Error:", err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
}

/* ---------------- CHECK ANSWERS ---------------- */

export async function checkRoundingQuiz(req, res) {
  try {
    const { userId, answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid answers format." });
    }

    let score = 0;
    const correctAnswers = {};

    for (const q of answers) {
      const original = await Quiz.findOne({ id: q.id });
      if (!original) continue;

      const correct = original.answer;
      correctAnswers[q.id] = correct;

      if (Number(q.answer) === Number(correct)) {
        score++;
      }

      await Quiz.deleteOne({ id: q.id });
    }

    if (userId) {
      await UserProgress.create({
        user: userId,
        score,
        date: new Date(),
      });
    }

    res.json({
      score,
      total: answers.length,
      correctAnswers,
    });
  } catch (err) {
    console.error("Check Error:", err);
    res.status(500).json({ error: "Error checking answers" });
  }
}