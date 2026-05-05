import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";



/* ================= PATTERN HELPERS ================= */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
/* ================= COMMON HELPERS ================= */

const generateNumberOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const variation = Math.floor(Math.random() * 10) + 1;
    const sign = Math.random() > 0.5 ? 1 : -1;

    const val = Number(correct) + sign * variation;

    if (!isNaN(val) && val >= 0) {
      options.add(val);
    }
  }

  return shuffle([...options]);
};

/* Normalize answers (VERY IMPORTANT) */
const normalize = (val) => {
  if (!val) return "";

  return String(val)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/\[|\]/g, "")   // remove array brackets
    .replace(/,+/g, ",");    // normalize commas
};

const isEqualAnswer = (userAns, correctAns) => {
  return normalize(userAns) === normalize(correctAns);
};

const generateOptionsFromAnswer = (correct) => {
  if (typeof correct === "number") {
    return generateNumberOptions(correct);
  }

  // for string answers (like patterns)
  return shuffle([
    correct,
    correct + "x",
    correct.split("").reverse().join(""),
    correct.replace(/./, "Z")
  ]);
};

/* ================= 1. PATTERN QUESTIONS ================= */

// a) 2,4,6,8,...
const generateEvenPattern = () => {
  const start = 2;
  const step = 2;

  const seq = [2, 4, 6, 8];
  const next = [10, 12, 14];

  return {
    type: "pattern_even",
    question: "Complete: 2, 4, 6, 8, __, __, __",
    answer: next.join(", "),
    options: shuffle([
      next.join(", "),
      "9, 11, 13",
      "12, 14, 16",
      "10, 11, 12"
    ])
  };
};

// b) 10,20,30...
const generateTensPattern = () => {
  const next = [40, 50, 60];

  return {
    type: "pattern_tens",
    question: "Complete: 10, 20, 30, __, __, __",
    answer: next.join(", "),
    options: shuffle([
      next.join(", "),
      "35, 45, 55",
      "50, 60, 70",
      "40, 60, 80"
    ])
  };
};

// c) 6,10,14,18...
const generatePlusFourPattern = () => {
  const next = [22, 26, 30];

  return {
    type: "pattern_plus4",
    question: "Complete: 6, 10, 14, 18, __, __, __",
    answer: next.join(", "),
    options: shuffle([
      next.join(", "),
      "20, 24, 28",
      "22, 24, 26",
      "21, 25, 29"
    ])
  };
};

// d) Ab, Bc, Cd...
const generateAlphabetPattern = () => {
  const answer = "De, Ef, Fg";

  return {
    type: "pattern_alpha",
    question: "Complete: Ab, Bc, Cd, __, __, __",
    answer,
    options: shuffle([
      answer,
      "Dd, Ee, Ff",
      "Ef, Fg, Gh",
      "De, Ee, Fe"
    ])
  };
};

// e) AOB, COD, EOF...
const generateSkipAlphabetPattern = () => {
  const answer = "GOH, IOJ, KOL";

  return {
    type: "pattern_skip_alpha",
    question: "Complete: AOB, COD, EOF, __, __, __",
    answer,
    options: shuffle([
      answer,
      "GHI, IJK, KLM",
      "GOH, HPI, IQJ",
      "XYZ, ABC, DEF"
    ])
  };
};

/* ================= 2. PATTERN OPERATIONS ================= */

// 1 + 3 + 5 pattern
const generateOddSumPattern = () => {
  const seq = [1, 3, 5, 9, 18];

  const next1 = 36;
  const next2 = 72;

  return {
    type: "pattern_odd_sum",
    question: "1+3+5=9, 1+3+5+9=18, next?",
    answer: next1,
    options: generateNumberOptions(next1)
  };
};

// subtraction pattern
const generateSubtractionPattern = () => {
  const a = 10000;
  const b = Math.floor(Math.random() * 50) + 5;

  const answer = a - b;

  return {
    type: "pattern_subtract",
    question: `10000 - ${b} = ?`,
    answer,
    options: generateNumberOptions(answer)
  };
};

// multiplication chain
const generateMultiplicationPattern = () => {
  const result = 7 * 2 * 3 * 4;

  return {
    type: "pattern_multiply_chain",
    question: "7 × 2 × 3 × 4 = ?",
    answer: result,
    options: generateNumberOptions(result)
  };
};

// division pattern
const generateDivisionPattern = () => {
  const base = [10, 100, 1000, 10000];
  const num = base[Math.floor(Math.random() * base.length)];

  const answer = num / 2;

  return {
    type: "pattern_division",
    question: `${num} ÷ 2 = ?`,
    answer,
    options: generateNumberOptions(answer)
  };
};

/* ================= MASTER GENERATOR ================= */

const patternGenerators = [
  generateEvenPattern,
  generateTensPattern,
  generatePlusFourPattern,
  generateAlphabetPattern,
  generateSkipAlphabetPattern,
  generateOddSumPattern,
  generateSubtractionPattern,
  generateMultiplicationPattern,
  generateDivisionPattern
];

const generatePatternQuestion = () => {
  const fn =
    patternGenerators[Math.floor(Math.random() * patternGenerators.length)];
  return fn();
};

/* ================= API ================= */

export async function generatePatternwsQuiz(req, res) {
  try {
    const { count = 10 } = req.body || {};
    const questions = [];

    for (let i = 0; i < count; i++) {
      const q = generatePatternQuestion();
      const id = uuidv4();

      await Quiz.create({
        id,
        data: q,
        createdAt: new Date()
      });

      questions.push({
        id,
        type: q.type,
        question: q.question,
        options: q.options
      });
    }

    res.json({ success: true, questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Pattern quiz failed" });
  }
}

export async function checkPatternwsQuiz(req, res) {
  try {
    const { userId, answers } = req.body;

    let score = 0;
    const correctAnswers = {};

    for (const q of answers) {
      const original = await Quiz.findOne({ id: q.id });
      if (!original || !original.data) continue;

      const correct = original.data.answer;
      correctAnswers[q.id] = correct;

      if (isEqualAnswer(q.answer, correct)) score++;

      await Quiz.deleteOne({ id: q.id });
    }

    if (userId) {
      await UserProgress.create({
        user: userId,
        score,
        total: answers.length,
        date: new Date()
      });
    }

    res.json({
      success: true,
      score,
      total: answers.length,
      correctAnswers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Check failed" });
  }
}