import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ---------------- HELPERS ---------------- */

// random number generator
const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// generate number
const generateNumber = () => random(10000, 999999);

// convert number → expanded form (array)
const toExpandedForm = (num) => {
  const digits = num.toString().split("").reverse();
  const expanded = [];

  for (let i = 0; i < digits.length; i++) {
    if (digits[i] !== "0") {
      expanded.push(Number(digits[i]) * Math.pow(10, i));
    }
  }

  return expanded.reverse();
};

/* ---------------- QUESTION GENERATORS ---------------- */

// Q2: Expanded Form
const generateExpandedQuestion = () => {
  const number = generateNumber();
  const expanded = toExpandedForm(number);

  return {
    question: `Write ${number.toLocaleString()} in expanded form.`,
    answerarr: expanded, // store as array
  };
};

// Q3: Standard Form
const generateStandardQuestion = () => {
  const number = generateNumber();
  const expanded = toExpandedForm(number);

  return {
    question: `Write ${expanded.join(" + ")} in standard form.`,
    answer: number,
  };
};

/* ---------------- GENERATE APIs ---------------- */

// Expanded Quiz
export async function genExpandedQuiz(req, res) {
  try {
    const questions = [];

    for (let i = 0; i < 6; i++) {
      const q = generateExpandedQuestion();
      const id = uuidv4();

      await Quiz.create({
        id,
        question: q.question,
        answerarr: q.answerarr, // ✅ correct field
        createdAt: new Date(),
      });

      questions.push({
        id,
        question: q.question,
      });
    }

    res.json({ questions });
  } catch (err) {
    console.error("Expanded Generate Error:", err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
}

// Standard Quiz
export async function genStandardQuiz(req, res) {
  try {
    const questions = [];

    for (let i = 0; i < 6; i++) {
      const q = generateStandardQuestion();
      const id = uuidv4();

      await Quiz.create({
        id,
        question: q.question,
        answer: q.answer, // number
        createdAt: new Date(),
      });

      questions.push({
        id,
        question: q.question,
      });
    }

    res.json({ questions });
  } catch (err) {
    console.error("Standard Generate Error:", err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
}

/* ---------------- CHECK APIs ---------------- */

// Expanded Check
export async function checkExpandedQuiz(req, res) {
  try {
    const { userId, answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid answers format" });
    }

    let score = 0;
    const correctAnswers = {};

    for (const q of answers) {
      const original = await Quiz.findOne({ id: q.id });
      if (!original) continue;

      const correctArr = original.answerarr;

      // user input → array
      const userArr = q.answer
        .split("+")
        .map((x) => Number(x.trim()))
        .filter((x) => !isNaN(x));

      // sort both
      const correctSorted = [...correctArr].sort((a, b) => a - b);
      const userSorted = [...userArr].sort((a, b) => a - b);

      correctAnswers[q.id] = correctArr.join(" + ");

      if (JSON.stringify(correctSorted) === JSON.stringify(userSorted)) {
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
    console.error("Expanded Check Error:", err);
    res.status(500).json({ error: "Error checking answers" });
  }
}

// Standard Check
export async function checkStandardQuiz(req, res) {
  try {
    const { userId, answers } = req.body;

    if (!Array.isArray(answers)) {
      return res.status(400).json({ error: "Invalid answers format" });
    }

    let score = 0;
    const correctAnswers = {};

    for (const q of answers) {
      const original = await Quiz.findOne({ id: q.id });
      if (!original) continue;

      const correct = Number(original.answer);
      const userAns = Number(q.answer);

      correctAnswers[q.id] = correct;

      if (userAns === correct) {
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
    console.error("Standard Check Error:", err);
    res.status(500).json({ error: "Error checking answers" });
  }
}