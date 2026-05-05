import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ================= HELPERS ================= */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const generateNumberOptions = (correct) => {
  const options = new Set([Number(correct.toFixed(2))]);

  while (options.size < 4) {
    let variation = Math.random() * 50;
    let val = Number((correct + (Math.random() > 0.5 ? variation : -variation)).toFixed(2));

    if (val >= 0) options.add(val);
  }

  return shuffle([...options]);
};

/* ================= MONEY HELPERS ================= */

const toPaise = (rupees) => Math.round(rupees * 100);
const toRupees = (paise) => (paise / 100);

/* ================= QUESTION GENERATORS ================= */

/* ---- Worksheet 1 ---- */

// Convert rupees → paise
const generateRupeesToPaise = () => {
  const rupees = Number((Math.random() * 500).toFixed(2));
  const answer = toPaise(rupees);

  return {
    type: "money_rupees_to_paise",
    question: `Convert ₹ ${rupees} into paise`,
    answer,
    options: generateNumberOptions(answer)
  };
};

// Convert paise → rupees
const generatePaiseToRupees = () => {
  const paise = Math.floor(Math.random() * 10000) + 100;
  const answer = Number(toRupees(paise).toFixed(2));

  return {
    type: "money_paise_to_rupees",
    question: `Convert ${paise} paise into rupees`,
    answer,
    options: generateNumberOptions(answer)
  };
};

// Notes combination (simple version)
const generateNotesQuestion = () => {
  const total = [150, 200, 250][Math.floor(Math.random() * 3)];

  return {
    type: "money_notes",
    question: `How can you make ₹ ${total} using ₹10, ₹20 and ₹50 notes?`,
    answer: "multiple", // subjective
    options: []
  };
};

/* ---- Worksheet 2 ---- */

// Addition
const generateMoneyAddition = () => {
  const a = Number((Math.random() * 1000).toFixed(2));
  const b = Number((Math.random() * 1000).toFixed(2));
  const answer = Number((a + b).toFixed(2));

  return {
    type: "money_add",
    question: `₹ ${a} + ₹ ${b}`,
    answer,
    options: generateNumberOptions(answer)
  };
};

// Subtraction
const generateMoneySubtraction = () => {
  let a = Number((Math.random() * 2000 + 500).toFixed(2));
  let b = Number((Math.random() * 500).toFixed(2));

  const answer = Number((a - b).toFixed(2));

  return {
    type: "money_subtract",
    question: `₹ ${a} - ₹ ${b}`,
    answer,
    options: generateNumberOptions(answer)
  };
};

// Multiplication
const generateMoneyMultiply = () => {
  const a = Number((Math.random() * 500).toFixed(2));
  const b = Math.floor(Math.random() * 10) + 2;

  const answer = Number((a * b).toFixed(2));

  return {
    type: "money_multiply",
    question: `₹ ${a} × ${b}`,
    answer,
    options: generateNumberOptions(answer)
  };
};

// Division
const generateMoneyDivision = () => {
  const b = Math.floor(Math.random() * 10) + 2;
  const answer = Number((Math.random() * 200).toFixed(2));
  const a = Number((answer * b).toFixed(2));

  return {
    type: "money_divide",
    question: `₹ ${a} ÷ ${b}`,
    answer,
    options: generateNumberOptions(answer)
  };
};

/* ---- Worksheet 3 (Word Problems) ---- */

// Total cost
const generateTotalCost = () => {
  const a = Number((Math.random() * 20000).toFixed(2));
  const b = Number((Math.random() * 20000).toFixed(2));

  const answer = Number((a + b).toFixed(2));

  return {
    type: "money_word_add",
    question: `Cost of item1 = ₹${a}, item2 = ₹${b}. Find total cost.`,
    answer,
    options: generateNumberOptions(answer)
  };
};

// Difference
const generateDifference = () => {
  const a = Number((Math.random() * 10000).toFixed(2));
  const diff = Number((Math.random() * 2000).toFixed(2));

  const b = Number((a - diff).toFixed(2));

  return {
    type: "money_word_subtract",
    question: `One item costs ₹${a}. Another is ₹${diff} less. Find its cost.`,
    answer: b,
    options: generateNumberOptions(b)
  };
};

// Multiply packets
const generatePackets = () => {
  const price = Number((Math.random() * 500).toFixed(2));
  const qty = Math.floor(Math.random() * 10) + 2;

  const answer = Number((price * qty).toFixed(2));

  return {
    type: "money_word_multiply",
    question: `${qty} items cost ₹${price} each. Total cost?`,
    answer,
    options: generateNumberOptions(answer)
  };
};

// Division sharing
const generateSharing = () => {
  const total = Math.floor(Math.random() * 5000) + 500;
  const people = Math.floor(Math.random() * 10) + 2;

  const answer = Number((total / people).toFixed(2));

  return {
    type: "money_word_divide",
    question: `₹${total} shared among ${people} people. Each gets?`,
    answer,
    options: generateNumberOptions(answer)
  };
};

/* ================= GENERATOR POOL ================= */

const generators = [
  generateRupeesToPaise,
  generatePaiseToRupees,
  generateMoneyAddition,
  generateMoneySubtraction,
  generateMoneyMultiply,
  generateMoneyDivision,
  generateTotalCost,
  generateDifference,
  generatePackets,
  generateSharing
];

const generateRandomQuestion = () => {
  const fn = generators[Math.floor(Math.random() * generators.length)];
  return fn();
};

/* ================= NORMALIZER ================= */

const normalize = (val) => String(val).replace(/\s+/g, "");

const isEqualAnswer = (a, b) => normalize(a) === normalize(b);

/* ================= API ================= */

export async function generateMoneywsQuiz(req, res) {
  try {
    const { count = 10 } = req.body || {};
    const questions = [];

    for (let i = 0; i < count; i++) {
      const q = generateRandomQuestion();
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
    res.status(500).json({ error: "Failed to generate quiz" });
  }
}

export async function checkMoneywsQuiz(req, res) {
  try {
    const { userId, answers } = req.body;

    let score = 0;
    const correctAnswers = {};

    for (const q of answers) {
      const original = await Quiz.findOne({ id: q.id });

      if (!original || !original.data) continue;

      const correct = original.data.answer;
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
    res.status(500).json({ error: "Failed to check quiz" });
  }
}