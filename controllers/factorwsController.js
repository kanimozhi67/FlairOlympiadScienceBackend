import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ================= HELPERS ================= */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const generateOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const variation = Math.floor(Math.random() * 20) - 10;
    const val = correct + variation;
    if (val > 0) options.add(val);
  }

  return shuffle([...options]);
};

/* ✅ TRUE/FALSE FIX */
const TF_OPTIONS = ["✅ Yes", "❌ No"];
const mapBooleanToKid = (val) => (val ? "✅ Yes" : "❌ No");

/* ================= MATH HELPERS ================= */

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
};

const getPrimeFactors = (n) => {
  const factors = [];
  let num = n;

  for (let i = 2; i <= num; i++) {
    while (num % i === 0) {
      factors.push(i);
      num /= i;
    }
  }

  return factors;
};

const getHCF = (a, b) => (!b ? a : getHCF(b, a % b));
const getLCM = (a, b) => (a * b) / getHCF(a, b);

const getMultiples = (n, count) =>
  Array.from({ length: count }, (_, i) => n * (i + 1));

const getPrimesInRange = (start, end) => {
  const res = [];
  for (let i = start; i <= end; i++) {
    if (isPrime(i)) res.push(i);
  }
  return res;
};

/* ================= STATIC QUESTIONS ================= */

const staticBookQuestions = [
  { type: "prime", question: "2 is ___", answer: "prime", options: ["prime", "composite"] },
  { type: "prime", question: "9 is ___", answer: "composite", options: ["prime", "composite"] },

  {
    type: "true_false",
    question: "91 is divisible by 3",
    answer: mapBooleanToKid(false),
    options: TF_OPTIONS
  },
  {
    type: "true_false",
    question: "100 is divisible by 10",
    answer: mapBooleanToKid(true),
    options: TF_OPTIONS
  },

  {
    type: "hcf",
    question: "HCF of 13 and 52",
    answer: 13,
    options: generateOptions(13)
  },

  {
    type: "lcm",
    question: "LCM of 5 and 10",
    answer: 10,
    options: generateOptions(10)
  },

  {
    type: "list",
    question: "Prime numbers between 1 and 20",
    answer: getPrimesInRange(1, 20)
  }
];

/* ================= RANDOM GENERATORS ================= */

const generatePrimeQuestion = () => {
  const num = Math.floor(Math.random() * 50) + 2;
  return {
    type: "prime",
    question: `${num} is ___`,
    answer: isPrime(num) ? "prime" : "composite",
    options: ["prime", "composite"]
  };
};

const generateLCMQuestion = () => {
  const a = Math.floor(Math.random() * 20) + 2;
  const b = Math.floor(Math.random() * 20) + 2;

  const lcm = getLCM(a, b);

  return {
    type: "lcm",
    question: `Find LCM of ${a} and ${b}`,
    answer: lcm,
    options: generateOptions(lcm)
  };
};

const generateTrueFalseQuestion = () => {
  const num = Math.floor(Math.random() * 100) + 1;
  const divisor = [2, 3, 4, 5][Math.floor(Math.random() * 4)];

  const isDiv = num % divisor === 0;

  return {
    type: "true_false",
    question: `${num} is divisible by ${divisor}`,
    answer: mapBooleanToKid(isDiv),
    options: TF_OPTIONS
  };
};

const generators = [
  generatePrimeQuestion,
  generateLCMQuestion,
  generateTrueFalseQuestion
];

const generateRandomQuestion = () => {
  const useStatic = Math.random() < 0.7;

  if (useStatic) {
    return staticBookQuestions[
      Math.floor(Math.random() * staticBookQuestions.length)
    ];
  }

  const fn = generators[Math.floor(Math.random() * generators.length)];
  return fn();
};

/* ================= ANSWER CHECK ================= */

const normalize = (val) => {
  if (val === true || val === "true" || val === "✅ Yes") return "yes";
  if (val === false || val === "false" || val === "❌ No") return "no";
  return String(val);
};

const isEqualAnswer = (userAns, correctAns) => {
  if (Array.isArray(correctAns)) {
    if (!Array.isArray(userAns)) return false;
    return JSON.stringify([...userAns].sort()) === JSON.stringify([...correctAns].sort());
  }

  if (typeof correctAns === "object" && correctAns !== null) {
    return JSON.stringify(userAns) === JSON.stringify(correctAns);
  }

  return normalize(userAns) === normalize(correctAns);
};

/* ================= GENERATE QUIZ ================= */

export async function generateFactorQuiz(req, res) {
  const questions = [];

  for (let i = 0; i < 10; i++) {
    const q = generateRandomQuestion();
    const id = uuidv4();

    await Quiz.create({
      id,
      answerStringArr: q,
      createdAt: new Date(),
    });

    questions.push({
      id,
      type: q.type,
      question: q.question,
      options: q.options || null
    });
  }

  res.json({ questions });
}

/* ================= CHECK QUIZ ================= */

export async function checkFactorQuiz(req, res) {
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