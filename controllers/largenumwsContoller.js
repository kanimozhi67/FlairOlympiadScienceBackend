import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ---------------- HELPERS ---------------- */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

/* ---------------- EXACT BOOK QUESTIONS ---------------- */

const staticBookQuestions = [
  {
    type: "compare",
    question: "Compare: 45,321 ___ 45,312",
    options: [">", "<", "="],
    answer: ">"
  },
  {
    type: "compare",
    question: "Compare: 78,450 ___ 78,540",
    options: [">", "<", "="],
    answer: "<"
  },
  {
    type: "smallest",
    question: "Form the smallest number using digits: 3, 7, 5, 0, 2",
    options: [20357, 2357, 25703, 20537],
    answer: 20357
  },
  {
    type: "largest",
    question: "Form the largest number using digits: 3, 7, 5, 0, 2",
    options: [75320, 73520, 75230, 75032],
    answer: 75320
  },
  {
    type: "round",
    question: "Round 456 to nearest tens",
    options: [450, 460, 455, 500],
    answer: 460
  },
  {
    type: "round",
    question: "Round 782 to nearest hundreds",
    options: [700, 800, 780, 750],
    answer: 800
  },
  {
    type: "place",
    question: "What is the place value of 5 in 45,321?",
    options: [5000, 500, 50, 5],
    answer: 5000
  },
  {
    type: "expanded",
    question: "Write the expanded form of 4,532",
    options: [
      "4000 + 500 + 30 + 2",
      "400 + 5000 + 30 + 2",
      "4000 + 50 + 30 + 2",
      "4000 + 500 + 3 + 2"
    ],
    answer: "4000 + 500 + 30 + 2"
  },
  {
    type: "logic",
    question: "Which digit should you compare first in two numbers?",
    options: ["Leftmost digit", "Rightmost digit", "Middle digit"],
    answer: "Leftmost digit"
  },
  {
    type: "logic",
    question: "Can two numbers be compared without checking all digits?",
    options: ["Yes", "No"],
    answer: "Yes"
  }
];

const generateNumber = (length = 5) => {
  let num = "";
  while (num.length < length) {
    let digit = Math.floor(Math.random() * 10);
    if (num.length === 0 && digit === 0) continue;
    num += digit;
  }
  return Number(num);
};

const getPlaceValue = (digit, position) => {
  return digit * Math.pow(10, position);
};

const generateOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const variation = Math.floor(Math.random() * 1000) - 500;
    options.add(correct + variation);
  }

  return shuffle([...options]);
};

/* ---------------- QUESTION TYPES ---------------- */

/* 1. PLACE VALUE */
const generatePlaceValueQuestion = () => {
  const num = generateNumber(5).toString();

  const index = Math.floor(Math.random() * num.length);
  const digit = Number(num[index]);
  const position = num.length - index - 1;

  const placeValue = getPlaceValue(digit, position);

  return {
    type: "place",
    question: `What is the place value of ${digit} in ${num}?`,
    answer: placeValue,
    options: generateOptions(placeValue)
  };
};

/* 2. COMPARISON */
const generateComparisonQuestion = () => {
  const num1 = generateNumber(5);
  const num2 = generateNumber(5);

  let answer;
  if (num1 > num2) answer = ">";
  else if (num1 < num2) answer = "<";
  else answer = "=";

  return {
    type: "compare",
    question: `Compare: ${num1} ___ ${num2}`,
    answer,
    options: shuffle([">", "<", "="])
  };
};

/* 3. FORM SMALLEST NUMBER (FIXED) */
const generateSmallestNumberQuestion = () => {
  const digits = [];

  while (digits.length < 5) {
    const d = Math.floor(Math.random() * 10);
    if (!digits.includes(d)) digits.push(d);
  }

  // sort digits
  const sorted = [...digits].sort((a, b) => a - b);

  let smallest;

  if (sorted[0] === 0) {
    // find first non-zero digit
    const firstNonZeroIndex = sorted.findIndex(d => d !== 0);

    // swap it with 0
    [sorted[0], sorted[firstNonZeroIndex]] = [sorted[firstNonZeroIndex], sorted[0]];
  }

  smallest = Number(sorted.join(""));

  return {
    type: "smallest",
    question: `Form the smallest number using digits: ${digits.join(", ")}`,
    answer: smallest,
    options: generateOptions(smallest)
  };
};
/* 4. ROUNDING TO NEAREST 10 */
const generateRoundingTensQuestion = () => {
  const num = generateNumber(3);

  const rounded = Math.round(num / 10) * 10;

  return {
    type: "round10",
    question: `Round ${num} to nearest tens`,
    answer: rounded,
    options: generateOptions(rounded)
  };
};

/* 5. ROUNDING TO NEAREST 100 */
const generateRoundingHundredsQuestion = () => {
  const num = generateNumber(3);

  const rounded = Math.round(num / 100) * 100;

  return {
    type: "round100",
    question: `Round ${num} to nearest hundreds`,
    answer: rounded,
    options: generateOptions(rounded)
  };
};

/* ---------------- MASTER GENERATOR ---------------- */

const generators = [
  generatePlaceValueQuestion,
  generateComparisonQuestion,
  generateSmallestNumberQuestion,
  generateRoundingTensQuestion,
  generateRoundingHundredsQuestion
];

// const generateRandomQuestion = () => {
//   const fn = generators[Math.floor(Math.random() * generators.length)];
//   return fn();
// };

const generateRandomQuestion = () => {
  const useStatic = Math.random() < 0.5; // 50% book, 50% generated

  if (useStatic) {
    return staticBookQuestions[
      Math.floor(Math.random() * staticBookQuestions.length)
    ];
  }

  const fn = generators[Math.floor(Math.random() * generators.length)];
  return fn();
};
/* ---------------- GENERATE API ---------------- */

export async function generateQuiz(req, res) {
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
      question: q.question,
      options: q.options
    });
  }

  res.json({ questions });
}

/* ---------------- CHECK ANSWERS ---------------- */

export async function checkQuiz(req, res) {
  const { userId, answers } = req.body;

  let score = 0;
  const correctAnswers = {};

  for (const q of answers) {
    const original = await Quiz.findOne({ id: q.id });
    if (!original) continue;

    const correct = original.answerStringArr.answer;

    correctAnswers[q.id] = correct;

    if (String(q.answer) === String(correct)) {
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