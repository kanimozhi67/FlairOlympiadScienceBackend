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

  /* WORKSHEET 1 */
  {
    type: "subtraction",
    question: "68,234 – 15,022",
    answer: 53212,
    options: generateOptions(53212)
  },
  {
    type: "subtraction",
    question: "78,656 – 2,653",
    answer: 76003,
    options: generateOptions(76003)
  },
  {
    type: "subtraction",
    question: "12,094 – 3,144",
    answer: 8950,
    options: generateOptions(8950)
  },
  {
    type: "subtraction",
    question: "98,888 – 79,999",
    answer: 18889,
    options: generateOptions(18889)
  },
  {
    type: "logic",
    question: "Which number should be subtracted from 44,444 to get 6,666?",
    answer: 37778,
    options: generateOptions(37778)
  },
  {
    type: "logic",
    question: "Minuend is 11,345 and difference is 7,555. Find subtrahend.",
    answer: 3790,
    options: generateOptions(3790)
  },
  {
    type: "logic",
    question: "Subtract largest 5-digit number from smallest 6-digit number.",
    answer: 1,
    options: [1, 0, 10, 100]
  },

  /* WORKSHEET 2 */
  {
    type: "missing_number",
    question: "54,311 – ? = 20,433",
    answer: 33878,
    options: generateOptions(33878)
  },
  {
    type: "missing_number",
    question: "? – 13,455 = 30,876",
    answer: 44331,
    options: generateOptions(44331)
  },
  {
    type: "subtraction",
    question: "81,234 – 62,345",
    answer: 18889,
    options: generateOptions(18889)
  },
  {
    type: "subtraction",
    question: "40,383 – 1,097",
    answer: 39286,
    options: generateOptions(39286)
  },
  {
    type: "missing_number",
    question: "? – 987 = 10,564",
    answer: 11551,
    options: generateOptions(11551)
  },
  {
    type: "subtraction",
    question: "38,888 – 1",
    answer: 38887,
    options: generateOptions(38887)
  },
  {
    type: "subtraction",
    question: "16,667 – 16,667",
    answer: 0,
    options: [0, 1, 2, 10]
  },

  /* WORKSHEET 3 */
  {
    type: "mixed",
    question: "34,567 – 6,523 + 1,00,006",
    answer: 128050,
    options: generateOptions(128050)
  },
  {
    type: "mixed",
    question: "18,523 + 32,091 – 45,760",
     answer: 48654,
  options: generateOptions(48654)
  }
];

staticBookQuestions.push(
  {
    type: "mixed",
    question: "77,745 – 9,087 – 32,456",
    answer: 36202,
    options: generateOptions(36202)
  },
  {
    type: "mixed",
    question: "50,910 – 5,091 – 5,910",
    answer: 39909,
    options: generateOptions(39909)
  },
  {
    type: "word_problem",
    question: "Seema had ₹43,667 and spent ₹40,000. How much left?",
    answer: 3667,
    options: generateOptions(3667)
  },
  {
    type: "word_problem",
    question: "Wheat: 78,345 kg, 16,543 destroyed. Remaining?",
    answer: 61802,
    options: generateOptions(61802)
  }
);

/* WORKSHEET 4 (ESTIMATION) */
staticBookQuestions.push(
  {
    type: "estimation",
    question: "Estimate (nearest 10): 88 – 43",
    answer: 50,
    options: [50, 40, 60, 45]
  },
  {
    type: "estimation",
    question: "Estimate (nearest 10): 92 – 35",
    answer: 60,
    options: [60, 50, 70, 55]
  },
  {
    type: "estimation",
    question: "Estimate (nearest 100): 789 – 324",
    answer: 500,
    options: [500, 400, 600, 450]
  },
  {
    type: "estimation",
    question: "Estimate (nearest 100): 854 – 606",
    answer: 200,
    options: [200, 300, 100, 250]
  }
);
const generateSubtractionQuestion = () => {
  const a = Math.floor(Math.random() * 90000) + 1000;
  const b = Math.floor(Math.random() * 9000) + 100;

  const answer = a - b;

  return {
    type: "subtraction",
    question: `${a} - ${b}`,
    answer,
    options: generateOptions(answer)
  };
};

const generateMissingNumberQuestion = () => {
  const a = Math.floor(Math.random() * 50000) + 1000;
  const b = Math.floor(Math.random() * 20000) + 1000;

  const result = a - b;

  return {
    type: "missing_number",
    question: `${a} - ? = ${result}`,
    answer: b,
    options: generateOptions(b)
  };
};

const generateEstimationQuestion = () => {
  const a = Math.floor(Math.random() * 900) + 100;
  const b = Math.floor(Math.random() * 900) + 100;

  const est = Math.round(a / 100) * 100 - Math.round(b / 100) * 100;

  return {
    type: "estimation",
    question: `Estimate (nearest 100): ${a} - ${b}`,
    answer: est,
    options: generateOptions(est)
  };
};

const generators = [
  generateSubtractionQuestion,
  generateMissingNumberQuestion,
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
export async function generateSubtractionQuiz(req, res) {
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

export async function checkSubtractionQuiz(req, res) {
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