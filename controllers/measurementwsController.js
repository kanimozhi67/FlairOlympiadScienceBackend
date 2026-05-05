import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ================= HELPERS ================= */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const generateNumberOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const variation = Math.floor(Math.random() * 10) + 1;
    const sign = Math.random() > 0.5 ? 1 : -1;

    let val = Number(correct) + sign * variation;

    if (!isNaN(val) && val > 0) {
      options.add(Number(val.toFixed(2)));
    }
  }

  return shuffle([...options]);
};

const generateStringOptions = (correct, unit = "") => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const variation = Math.floor(Math.random() * 5) + 1;
    options.add(`${variation} ${unit}`);
  }

  return shuffle([...options]);
};

/* ================= CONVERSION ================= */

const convert = (value, from, to) => {
  const map = {
    mm: 1,
    cm: 10,
    m: 1000,
    km: 1000000,

    mg: 1,
    g: 1000,
    kg: 1000000,

    mL: 1,
    L: 1000
  };

  const result = (value * map[from]) / map[to];
  return Number.isInteger(result) ? result : Number(result.toFixed(2));
};

/* ================= QUESTION GENERATORS ================= */

const generateConversionQuestion = () => {
  const types = [
    ["kg", "g"],
    ["cm", "m"],
    ["m", "cm"],
    ["L", "mL"],
    ["km", "m"]
  ];

  const [from, to] = types[Math.floor(Math.random() * types.length)];
  const value = Math.floor(Math.random() * 100) + 1;

  const answer = convert(value, from, to);

  return {
    type: "conversion",
    question: `${value} ${from} to ${to}`,
    answer,
    options: generateNumberOptions(answer)
  };
};

const generateFillBlank = () => {
  const blanks = [
    { q: "1 m = ___ cm", a: 100 },
    { q: "1 kg = ___ g", a: 1000 },
    { q: "1 L = ___ mL", a: 1000 },
    { q: "1 km = ___ m", a: 1000 },
    { q: "1 g = ___ mg", a: 1000 }
  ];

  const item = blanks[Math.floor(Math.random() * blanks.length)];

  return {
    type: "fill_blank",
    question: item.q,
    answer: item.a,
    options: generateNumberOptions(item.a)
  };
};

const generateUnitQuestion = () => {
  const qs = [
    {
      question: "Length of a cloth",
      answer: "m",
      options: ["m", "kg", "L", "cm"]
    },
    {
      question: "Weight of an object",
      answer: "kg",
      options: ["kg", "m", "L", "cm"]
    },
    {
      question: "Distance between cities",
      answer: "km",
      options: ["km", "m", "g", "L"]
    },
    {
      question: "Water in a bucket",
      answer: "L",
      options: ["L", "kg", "cm", "mm"]
    }
  ];

  return {
    type: "unit",
    ...qs[Math.floor(Math.random() * qs.length)]
  };
};

/* ================= WORD PROBLEMS ================= */

const generateWeightAdd = () => {
  const kg1 = Math.floor(Math.random() * 20) + 1;
  const g1 = Math.floor(Math.random() * 1000);

  const kg2 = Math.floor(Math.random() * 20) + 1;
  const g2 = Math.floor(Math.random() * 1000);

  let g = g1 + g2;
  let kg = kg1 + kg2;

  if (g >= 1000) {
    kg += 1;
    g -= 1000;
  }

  const answer = `${kg} kg ${g} g`;

  return {
    type: "word_problem",
    question: `Two bags weigh ${kg1} kg ${g1} g and ${kg2} kg ${g2} g. Find total weight.`,
    answer,
    options: shuffle([
      answer,
      `${kg + 1} kg ${g} g`,
      `${kg} kg ${g + 100} g`,
      `${kg - 1} kg ${g} g`
    ])
  };
};

const generateWeightSubtract = () => {
  const totalKg = Math.floor(Math.random() * 50) + 20;
  const totalG = Math.floor(Math.random() * 1000);

  const lostKg = Math.floor(Math.random() * 10);
  const lostG = Math.floor(Math.random() * 1000);

  let g = totalG - lostG;
  let kg = totalKg - lostKg;

  if (g < 0) {
    kg -= 1;
    g += 1000;
  }

  const answer = `${kg} kg ${g} g`;

  return {
    type: "word_problem",
    question: `A person had ${totalKg} kg ${totalG} g and lost ${lostKg} kg ${lostG} g. Find remaining weight.`,
    answer,
    options: shuffle([
      answer,
      `${kg + 1} kg ${g} g`,
      `${kg} kg ${g + 200} g`,
      `${kg - 1} kg ${g} g`
    ])
  };
};

const generateDistance = () => {
  const km1 = Math.floor(Math.random() * 10);
  const m1 = Math.floor(Math.random() * 1000);

  const km2 = Math.floor(Math.random() * 10);
  const m2 = Math.floor(Math.random() * 1000);

  let m = m1 + m2;
  let km = km1 + km2;

  if (m >= 1000) {
    km += 1;
    m -= 1000;
  }

  const answer = `${km} km ${m} m`;

  return {
    type: "word_problem",
    question: `Distance is ${km1} km ${m1} m and ${km2} km ${m2} m. Find total distance.`,
    answer,
    options: shuffle([
      answer,
      `${km + 1} km ${m} m`,
      `${km} km ${m + 200} m`,
      `${km - 1} km ${m} m`
    ])
  };
};

const generateLiquid = () => {
  const L1 = Math.floor(Math.random() * 50);
  const mL1 = Math.floor(Math.random() * 1000);

  const L2 = Math.floor(Math.random() * 50);
  const mL2 = Math.floor(Math.random() * 1000);

  let mL = mL1 + mL2;
  let L = L1 + L2;

  if (mL >= 1000) {
    L += 1;
    mL -= 1000;
  }

  const answer = `${L} L ${mL} mL`;

  return {
    type: "word_problem",
    question: `${L1} L ${mL1} mL + ${L2} L ${mL2} mL. Find total.`,
    answer,
    options: shuffle([
      answer,
      `${L + 1} L ${mL} mL`,
      `${L} L ${mL + 200} mL`,
      `${L - 1} L ${mL} mL`
    ])
  };
};

/* ================= MASTER GENERATOR ================= */

const generators = [
  generateConversionQuestion,
  generateFillBlank,
  generateUnitQuestion,
  generateWeightAdd,
  generateWeightSubtract,
  generateDistance,
  generateLiquid
];

const generateRandomQuestion = () => {
  const fn = generators[Math.floor(Math.random() * generators.length)];
  return fn();
};

/* ================= ANSWER CHECK ================= */

const normalize = (val) => {
  if (!val) return "";
  return String(val).toLowerCase().replace(/\s+/g, "");
};

const isEqualAnswer = (userAns, correctAns) => {
  return normalize(userAns) === normalize(correctAns);
};

/* ================= API ================= */

export async function generateMeasureQuiz(req, res) {
  const questions = [];

  for (let i = 0; i < 10; i++) {
    const q = generateRandomQuestion();
    const id = uuidv4();

    await Quiz.create({
      id,
      answerStringArr: q,
      createdAt: new Date()
    });

    questions.push({
      id,
      type: q.type,
      question: q.question,
      options: q.options
    });
  }

  res.json({ questions });
}

export async function checkMeasureQuiz(req, res) {
  const { userId, answers } = req.body;

  let score = 0;
  const correctAnswers = {};

  for (const q of answers) {
    const original = await Quiz.findOne({ id: q.id });
    if (!original) continue;

    const correct = original.answerStringArr.answer;
    correctAnswers[q.id] = correct;

    if (isEqualAnswer(q.answer, correct)) {
      score++;
    }

    await Quiz.deleteOne({ id: q.id });
  }

  if (userId) {
    await UserProgress.create({
      user: userId,
      score,
      date: new Date()
    });
  }

  res.json({
    score,
    total: answers.length,
    correctAnswers
  });
}