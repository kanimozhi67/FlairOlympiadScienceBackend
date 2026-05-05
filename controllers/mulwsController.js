import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ---------------- HELPERS ---------------- */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const generateOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const variation = Math.floor(Math.random() * 5000) - 2500;
    options.add(correct + variation);
  }

  return shuffle([...options]);
};

/* ---------------- STATIC BOOK QUESTIONS ---------------- */

const staticBookQuestions = [

  /* WORKSHEET 1 - BASIC MULTIPLICATION */
  {
    type: "multiplication",
    question: "9,163 × 2",
    answer: 18326,
    options: generateOptions(18326)
  },
  {
    type: "multiplication",
    question: "6,904 × 8",
    answer: 55232,
    options: generateOptions(55232)
  },
  {
    type: "multiplication",
    question: "7,143 × 4",
    answer: 28572,
    options: generateOptions(28572)
  },
  {
    type: "multiplication",
    question: "1,099 × 5",
    answer: 5495,
    options: generateOptions(5495)
  },
  {
    type: "multiplication",
    question: "8,846 × 9",
    answer: 79614,
    options: generateOptions(79614)
  },
  {
    type: "multiplication",
    question: "2,456 × 6",
    answer: 14736,
    options: generateOptions(14736)
  },

  /* WORKSHEET 1 - PRODUCT */
  {
    type: "multiplication",
    question: "853 × 21",
    answer: 17913,
    options: generateOptions(17913)
  },
  {
    type: "multiplication",
    question: "9,045 × 36",
    answer: 325620,
    options: generateOptions(325620)
  },
  {
    type: "multiplication",
    question: "7,684 × 44",
    answer: 338096,
    options: generateOptions(338096)
  },
  {
    type: "multiplication",
    question: "5,169 × 59",
    answer: 304971,
    options: generateOptions(304971)
  },
  {
    type: "multiplication",
    question: "8,333 × 65",
    answer: 541645,
    options: generateOptions(541645)
  },
  {
    type: "multiplication",
    question: "363 × 83",
    answer: 30129,
    options: generateOptions(30129)
  },

  /* COLUMN METHOD */
  {
    type: "multiplication",
    question: "888 × 88",
    answer: 78144,
    options: generateOptions(78144)
  },
  {
    type: "multiplication",
    question: "7,876 × 123",
    answer: 968748,
    options: generateOptions(968748)
  },
  {
    type: "multiplication",
    question: "6,941 × 121",
    answer: 840861,
    options: generateOptions(840861)
  },
  {
    type: "multiplication",
    question: "460 × 990",
    answer: 455400,
    options: generateOptions(455400)
  },
  {
    type: "multiplication",
    question: "3,306 × 256",
    answer: 846336,
    options: generateOptions(846336)
  },
  {
    type: "multiplication",
    question: "342 × 555",
    answer: 189810,
    options: generateOptions(189810)
  },

  /* MISSING NUMBERS */
  {
    type: "logic",
    question: "64,023 × ___ = 64,023",
    answer: 1,
    options: [1, 0, 10, 2]
  },
  {
    type: "logic",
    question: "9,345 × ___ = 9,345",
    answer: 1,
    options: [1, 0, 2, 10]
  },
  {
    type: "logic",
    question: "(133 × 66) × 20 = ___ × (66 × 20)",
    answer: 133,
    options: [133, 66, 20, 1]
  },
  {
    type: "logic",
    question: "___ × 1,684 = 1,684",
    answer: 1,
    options: [1, 0, 2, 10]
  },
  {
    type: "logic",
    question: "19 × 545 = 545 × ___",
    answer: 19,
    options: [19, 545, 1, 0]
  },
  {
    type: "logic",
    question: "144 × (29 × 840) = (144 × 29) × ___",
    answer: 840,
    options: [840, 29, 144, 1]
  },

  /* WORKSHEET 3 - ESTIMATION */
  {
    type: "estimation",
    question: "Estimate: 813 × 42",
    answer: 800 * 40,
    options: generateOptions(32000)
  },
  {
    type: "estimation",
    question: "Estimate: 695 × 37",
    answer: 700 * 40,
    options: generateOptions(28000)
  },

  /* WORD PROBLEMS */
  {
    type: "word_problem",
    question: "129 beads × 12 necklaces",
    answer: 1548,
    options: generateOptions(1548)
  },
  {
    type: "word_problem",
    question: "100 saplings × 323 rows",
    answer: 32300,
    options: generateOptions(32300)
  },
  {
    type: "word_problem",
    question: "135 muffins × 1000 cartons",
    answer: 135000,
    options: generateOptions(135000)
  }
];

/* ---------------- RANDOM GENERATORS ---------------- */

const generateMultiplicationQuestion = () => {
  const a = Math.floor(Math.random() * 9000) + 100;
  const b = Math.floor(Math.random() * 90) + 10;

  const answer = a * b;

  return {
    type: "multiplication",
    question: `${a} × ${b}`,
    answer,
    options: generateOptions(answer)
  };
};

const generateEstimationQuestion = () => {
  const a = Math.floor(Math.random() * 900) + 100;
  const b = Math.floor(Math.random() * 90) + 10;

  const est =
    Math.round(a / 100) * 100 * Math.round(b / 10) * 10;

  return {
    type: "estimation",
    question: `Estimate: ${a} × ${b}`,
    answer: est,
    options: generateOptions(est)
  };
};

const generateMissingQuestion = () => {
  const a = Math.floor(Math.random() * 1000) + 10;
  const b = Math.floor(Math.random() * 50) + 2;

  const result = a * b;

  return {
    type: "missing_number",
    question: `${a} × ___ = ${result}`,
    answer: b,
    options: generateOptions(b)
  };
};

const generators = [
  generateMultiplicationQuestion,
  generateEstimationQuestion,
  generateMissingQuestion
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

export async function generateMultiplicationQuiz(req, res) {
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

export async function checkMultiplicationQuiz(req, res) {
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