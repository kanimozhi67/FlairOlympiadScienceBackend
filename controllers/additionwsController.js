import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";



/* ---------------- ADDITION WORKSHEET 5 (WITH OPTIONS) ---------------- */

const staticBookQuestions = [
  {
    type: "addition_tens",
    question: "72 + 15",
    answer: 87,
    options: [87, 90, 85, 80]
  },
  {
    type: "addition_tens",
    question: "89 + 78",
    answer: 167,
    options: [167, 170, 160, 150]
  },
  {
    type: "addition_tens",
    question: "175 + 147",
    answer: 322,
    options: [322, 330, 320, 300]
  },
  {
    type: "addition_tens",
    question: "1287 + 876",
    answer: 2163,
    options: [2163, 2170, 2100, 2200]
  },
  {
    type: "addition_tens",
    question: "218 + 2873",
    answer: 3091,
    options: [3091, 3090, 3000, 3100]
  },
  {
    type: "addition_hundreds",
    question: "224 + 192",
    answer: 416,
    options: [416, 400, 420, 300]
  },
  {
    type: "addition_hundreds",
    question: "1908 + 792",
    answer: 2700,
    options: [2700, 2600, 2800, 2500]
  },
  {
    type: "addition_hundreds",
    question: "363 + 927",
    answer: 1290,
    options: [1290, 1300, 1200, 1400]
  },
  {
    type: "word_problem",
    question: "Rajesh bought a toothpaste for ₹97, a brush for ₹29 and a soap for ₹32. Approximately how much did he pay?",
    answer: 160,
    options: [160, 150, 170, 180]
  },
  {
    type: "word_problem",
    question: "Suman had 2,197, 1,976 and 985 papers. Rounded to nearest hundreds, total papers?",
    answer: 5200,
    options: [5200, 5100, 5000, 5300]
  }
];
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const generateOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const variation = Math.floor(Math.random() * 200) - 100;
    options.add(correct + variation);
  }

  return shuffle([...options]);
};
const generateAdditionTensQuestion = () => {
  const a = Math.floor(Math.random() * 900) + 10;
  const b = Math.floor(Math.random() * 900) + 10;

  const sum = a + b;

  return {
    type: "addition_tens",
    question: `${a} + ${b}`,
    answer: sum,
    options: generateOptions(sum)
  };
};
const generateAdditionHundredsQuestion = () => {
  const a = Math.floor(Math.random() * 900) + 100;
  const b = Math.floor(Math.random() * 900) + 100;

  const sum = a + b;

  return {
    type: "addition_hundreds",
    question: `${a} + ${b}`,
    answer: sum,
    options: generateOptions(sum)
  };
};
const generateWordProblem = () => {
  const a = Math.floor(Math.random() * 200) + 10;
  const b = Math.floor(Math.random() * 200) + 10;
  const c = Math.floor(Math.random() * 200) + 10;

  const total = a + b + c;
  const estimated = Math.round(total / 10) * 10;

  return {
    type: "word_problem",
    question: `A boy bought items worth ₹${a}, ₹${b} and ₹${c}. Approximately how much did he pay?`,
    answer: estimated,
    options: generateOptions(estimated)
  };
};
const generators = [
  generateAdditionTensQuestion,
  generateAdditionHundredsQuestion,
  generateWordProblem
];

const generateRandomQuestion = () => {
  const useStatic = Math.random() < 0.5;

  if (useStatic) {
    return staticBookQuestions[
      Math.floor(Math.random() * staticBookQuestions.length)
    ];
  }

  const fn = generators[Math.floor(Math.random() * generators.length)];
  return fn();
};


/* ---------------- GENERATE API ---------------- */

export async function generateQuiz2(req, res) {
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

export async function checkQuiz2(req, res) {
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