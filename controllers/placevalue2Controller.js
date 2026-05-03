import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ---------------- HELPERS ---------------- */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

// generate unique digits
const generateDigits = (count = 5) => {
  const set = new Set();

  while (set.size < count) {
    set.add(Math.floor(Math.random() * 10));
  }

  return [...set];
};

// smallest (no repetition)
const getSmallest = (digits) => {
  const arr = [...digits].sort((a, b) => a - b);

  // avoid leading zero
  if (arr[0] === 0) {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] !== 0) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        break;
      }
    }
  }

  return Number(arr.join(""));
};

// greatest
const getGreatest = (digits) => {
  return Number([...digits].sort((a, b) => b - a).join(""));
};

// smallest 6-digit (repeat allowed, use all digits)
const getSmallest6 = (digits) => {
  const sorted = [...digits].sort((a, b) => a - b);

  let result = [...sorted];

  // add smallest digit until length = 6
  while (result.length < 6) {
    result.push(sorted[0]);
  }

  // NOW sort again to make it truly smallest
  result.sort((a, b) => a - b);

  // fix leading zero
  if (result[0] === 0) {
    for (let i = 1; i < result.length; i++) {
      if (result[i] !== 0) {
        [result[0], result[i]] = [result[i], result[0]];
        break;
      }
    }
  }

  return Number(result.join(""));
};

// greatest 6-digit
const getGreatest6 = (digits) => {
  const sorted = [...digits].sort((a, b) => b - a);

  let result = [...sorted];

  while (result.length < 6) {
    result.push(sorted[0]); // repeat largest
  }

  return Number(result.sort((a, b) => b - a).join(""));
};

/* ---------------- QUESTION GENERATOR ---------------- */

const generateNumberFormationQuestion = () => {
  const isFiveDigit = Math.random() > 0.5;

  if (isFiveDigit) {
    const digits = generateDigits(5);

    const smallest = getSmallest(digits);
    const greatest = getGreatest(digits);

    const askSmallest = Math.random() > 0.5;
    const answer = askSmallest ? smallest : greatest;

    return {
      question: `Using digits ${digits.join(", ")}, find the ${
        askSmallest ? "SMALLEST" : "GREATEST"
      } number (use each digit once).`,
      answer,
    };
  } else {
    const digits = generateDigits(3);

    const smallest = getSmallest6(digits);
    const greatest = getGreatest6(digits);

    const askSmallest = Math.random() > 0.5;
    const answer = askSmallest ? smallest : greatest;

    return {
      question: `Using digits ${digits.join(
        ", "
      )}, find the ${
        askSmallest ? "SMALLEST" : "GREATEST"
      } 6-digit number (digits can repeat, use each at least once).`,
      answer,
    };
  }
};

/* ---------------- GENERATE API ---------------- */

export async function genNumberFormation(req, res) {
  try {
    const questions = [];

    for (let i = 0; i < 6; i++) {
      const q = generateNumberFormationQuestion();
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

    console.log("Generated Questions:", questions);

    res.json({ questions });
  } catch (err) {
    console.error("Generate Error:", err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
}

/* ---------------- CHECK ANSWERS ---------------- */

export async function checkNumberFormation(req, res) {
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

      // remove after attempt
      await Quiz.deleteOne({ id: q.id });
    }

    // save progress
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