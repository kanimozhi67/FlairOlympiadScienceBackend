import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ---------------- HELPERS ---------------- */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const generateOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const variation = Math.floor(Math.random() * 50) - 25;
    options.add(correct + variation);
  }

  return shuffle([...options]);
};

/* ---------------- STATIC BOOK QUESTIONS ---------------- */

const staticBookQuestions = [

  /* ================= WORKSHEET 1 ================= */

  // Divide and verify
  { type: "division", question: "643 ÷ 4", answer: 160, remainder: 3, options: generateOptions(160) },
  { type: "division", question: "895 ÷ 2", answer: 447, remainder: 1, options: generateOptions(447) },
  { type: "division", question: "6721 ÷ 8", answer: 840, remainder: 1, options: generateOptions(840) },
  { type: "division", question: "4999 ÷ 6", answer: 833, remainder: 1, options: generateOptions(833) },
  { type: "division", question: "73245 ÷ 9", answer: 8138, remainder: 3, options: generateOptions(8138) },
  { type: "division", question: "90033 ÷ 7", answer: 12861, remainder: 6, options: generateOptions(12861) },

  // Solve
  { type: "division", question: "295 ÷ 31", answer: 9, remainder: 16, options: generateOptions(9) },
  { type: "division", question: "878 ÷ 25", answer: 35, remainder: 3, options: generateOptions(35) },
  { type: "division", question: "6904 ÷ 16", answer: 431, remainder: 8, options: generateOptions(431) },
  { type: "division", question: "5135 ÷ 46", answer: 111, remainder: 29, options: generateOptions(111) },

  // Quotient & remainder
  { type: "division", question: "109 ÷ 10", answer: 10, remainder: 9, options: generateOptions(10) },
  { type: "division", question: "267 ÷ 100", answer: 2, remainder: 67, options: generateOptions(2) },
  { type: "division", question: "7446 ÷ 1000", answer: 7, remainder: 446, options: generateOptions(7) },

  // True / False
//   {
//     type: "true_false",
//     question: "745 ÷ 10 gives quotient 745",
//     answer: false,
//     options: [true, false]
//   },
//   {
//     type: "true_false",
//     question: "2043 ÷ 100 gives remainder 43",
//     answer: true,
//     options: [true, false]
//   },

  /* ================= WORKSHEET 2 ================= */

  { type: "division", question: "642 ÷ 5", answer: 128, remainder: 2, options: generateOptions(128) },
  { type: "division", question: "398 ÷ 8", answer: 49, remainder: 6, options: generateOptions(49) },
  { type: "division", question: "1043 ÷ 9", answer: 115, remainder: 8, options: generateOptions(115) },
  { type: "division", question: "7120 ÷ 6", answer: 1186, remainder: 4, options: generateOptions(1186) },

  // Fill blanks
  {
    type: "logic",
    question: "451 ÷ ___ = 451",
    answer: 1,
    options: [1, 0, 10, 451]
  },
  {
    type: "logic",
    question: "___ ÷ 6812 = 1",
    answer: 6812,
    options: generateOptions(6812)
  },
  {
    type: "logic",
    question: "904 ÷ 904 = ___",
    answer: 1,
    options: [1, 0, 904, 2]
  },

  // Word problems
  {
    type: "word_problem",
    question: "246 toffees distributed equally among 6 students",
    answer: 41,
    options: generateOptions(41)
  },
  {
    type: "word_problem",
    question: "4895 kg grains in sacks of 55 kg each",
    answer: 89,
    options: generateOptions(89)
  },
  {
    type: "word_problem",
    question: "₹11730 shared by 46 students",
    answer: 255,
    options: generateOptions(255)
  },

  /* ================= WORKSHEET 3 ================= */

  // Estimation
  {
    type: "estimation",
    question: "Estimate: 541 ÷ 2",
    answer: 270,
    options: generateOptions(270)
  },
  {
    type: "estimation",
    question: "Estimate: 64 ÷ 13",
    answer: 5,
    options: generateOptions(5)
  },
  {
    type: "estimation",
    question: "Estimate: 2852 ÷ 64",
    answer: 45,
    options: generateOptions(45)
  },

  // Simplify (BODMAS)
  {
    type: "simplify",
    question: "8 - 4 + 9 ÷ 3",
    answer: 7,
    options: generateOptions(7)
  },
  {
    type: "simplify",
    question: "7 × 5 + 6 - 1",
    answer: 40,
    options: generateOptions(40)
  },
  {
    type: "simplify",
    question: "14 + 3 × 15 ÷ 5",
    answer: 23,
    options: generateOptions(23)
  }
];

/* ---------------- RANDOM GENERATORS ---------------- */

const generateDivisionQuestion = () => {
  const divisor = Math.floor(Math.random() * 9) + 2;
  const quotient = Math.floor(Math.random() * 200) + 10;
  const remainder = Math.floor(Math.random() * divisor);

  const dividend = divisor * quotient + remainder;

  return {
    type: "division",
    question: ` what is the quotient of ${dividend} ÷ ${divisor}`,
    answer: quotient,
    remainder,
    options: generateOptions(quotient)
  };
};


const roundSmart = (num) => {
  if (num < 100) return Math.round(num / 10) * 10;      // 2-digit → tens
  if (num < 1000) return Math.round(num / 100) * 100;   // 3-digit → hundreds
  return Math.round(num / 1000) * 1000;                 // 4-digit → thousands
};

const generateEstimationQuestion = () => {
  const a = Math.floor(Math.random() * 9000) + 100;
  const b = Math.floor(Math.random() * 90) + 10;

  const roundedA = roundSmart(a);
  const roundedB = Math.round(b / 10) * 10;

  const est = Math.round(roundedA / roundedB);

  return {
    type: "estimation",
    question: `Estimate and find quotient : ${a} ÷ ${b}`,
    answer: est,
    options: generateOptions(est)
  };
};

const generators = [
  generateDivisionQuestion,
  generateEstimationQuestion
];

const generateRandomQuestion = () => {
  const useStatic = Math.random() < 0.6;

  if (useStatic) {
    return staticBookQuestions[
      Math.floor(Math.random() * staticBookQuestions.length)
    ];
  }

  const fn = generators[Math.floor(Math.random() * generators.length)];
  return fn();
};

/* ---------------- CONTROLLERS ---------------- */

export async function generateDivisionQuiz(req, res) {
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

export async function checkDivisionQuiz(req, res) {
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