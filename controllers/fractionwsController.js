import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ================= HELPERS ================= */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

const lcm = (a, b) => (a * b) / gcd(a, b);

const simplify = (num, den) => {
  const g = gcd(num, den);
  return [num / g, den / g];
};

const generateNumberOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    let variation = Math.floor(Math.random() * 10) + 1;
    let val = correct + (Math.random() > 0.5 ? variation : -variation);

    if (val > 0) options.add(val);
  }

  return shuffle([...options]);
};

/* ================= FRACTION HELPERS ================= */
// Improper → Mixed
const generateImproperToMixed = () => {
  const d = Math.floor(Math.random() * 10) + 2;
  const n = d * (Math.floor(Math.random() * 3) + 2) + Math.floor(Math.random() * d);

  const whole = Math.floor(n / d);
  const rem = n % d;

  return {
    type: "improper_to_mixed",
    question: `Convert ${n}/${d} into mixed fraction`,
    answer: `${whole} ${rem}/${d}`,
    options: []
  };
};

// Mixed → Improper
const generateMixedToImproper = () => {
  const whole = Math.floor(Math.random() * 5) + 1;
  const d = Math.floor(Math.random() * 10) + 2;
  const n = Math.floor(Math.random() * d);

  const improper = whole * d + n;

  return {
    type: "mixed_to_improper",
    question: `Convert ${whole} ${n}/${d} into improper fraction`,
    answer: `${improper}/${d}`,
    options: []
  };
};

// Identify type
const generateIdentifyFraction = () => {
  const types = ["proper", "improper", "mixed"];
  const type = types[Math.floor(Math.random() * 3)];

  let question, answer;

  if (type === "proper") {
    const d = Math.floor(Math.random() * 10) + 2;
    const n = Math.floor(Math.random() * (d - 1)) + 1;
    question = `${n}/${d}`;
    answer = "proper";
  } else if (type === "improper") {
    const d = Math.floor(Math.random() * 10) + 2;
    const n = d + Math.floor(Math.random() * 10);
    question = `${n}/${d}`;
    answer = "improper";
  } else {
    const whole = Math.floor(Math.random() * 5) + 1;
    const d = Math.floor(Math.random() * 10) + 2;
    const n = Math.floor(Math.random() * d);
    question = `${whole} ${n}/${d}`;
    answer = "mixed";
  }

  return {
    type: "identify_fraction",
    question: `Identify: ${question}`,
    answer,
    options: ["proper", "improper", "mixed"]
  };
};
// Addition (same denominator)
const generateAddFractions = () => {
  const d = Math.floor(Math.random() * 15) + 2;
  const a = Math.floor(Math.random() * d);
  const b = Math.floor(Math.random() * d);

  const result = simplify(a + b, d);

  return {
    type: "add_fraction",
    question: `${a}/${d} + ${b}/${d}`,
    answer: `${result[0]}/${result[1]}`,
    options: []
  };
};

// Subtraction
const generateSubtractFractions = () => {
  const d = Math.floor(Math.random() * 15) + 2;
  let a = Math.floor(Math.random() * d);
  let b = Math.floor(Math.random() * d);

  if (b > a) [a, b] = [b, a];

  const result = simplify(a - b, d);

  return {
    type: "subtract_fraction",
    question: `${a}/${d} - ${b}/${d}`,
    answer: `${result[0]}/${result[1]}`,
    options: []
  };
};

// Missing subtraction
const generateMissingSubtract = () => {
  const d = Math.floor(Math.random() * 20) + 2;
  const a = Math.floor(Math.random() * d) + d;
  const b = Math.floor(Math.random() * d);

  return {
    type: "missing_subtract",
    question: `What should be subtracted from ${a}/${d} to get ${b}/${d}?`,
    answer: `${a - b}/${d}`,
    options: []
  };
};

// Missing addition
const generateMissingAdd = () => {
  const d = Math.floor(Math.random() * 20) + 2;
  const a = Math.floor(Math.random() * d);
  const sum = Math.floor(Math.random() * d) + d;

  return {
    type: "missing_add",
    question: `What should be added to ${a}/${d} to get ${sum}/${d}?`,
    answer: `${sum - a}/${d}`,
    options: []
  };
};
// Books problem
const generateBooksProblem = () => {
  return {
    type: "word_books",
    question: `A shopkeeper sold 3/7 of chemistry books and 2/7 of physics books. Total sold?`,
    answer: "5/7",
    options: []
  };
};

// Time problem
const generateTimeProblem = () => {
  return {
    type: "word_time",
    question: `Aania studies 1 3/8 hrs and plays 2/8 hrs. Total time?`,
    answer: "1 5/8",
    options: []
  };
};

// Mango problem
const generateMangoProblem = () => {
  return {
    type: "word_mango",
    question: `Basket had 7 3/22 mangoes. Took 5 7/22. Left?`,
    answer: "1 18/22",
    options: []
  };
};

// Distance problem
const generateDistanceProblem = () => {
  return {
    type: "word_distance",
    question: `Distance: 7/4 km + 6/4 km. Total?`,
    answer: "13/4",
    options: []
  };
};

// Ribbon problem
const generateRibbonProblem = () => {
  return {
    type: "word_ribbon",
    question: `Sneha used 1/4 m, Shreya used 2/4 m. Who used more and by how much?`,
    answer: "Shreya, 1/4",
    options: []
  };
};

const fractionToString = (n, d) => `${n}/${d}`;

const generateFraction = () => {
  const d = Math.floor(Math.random() * 10) + 2;
  const n = Math.floor(Math.random() * d) + 1;
  return [n, d];
};

/* ================= WORKSHEET 1 ================= */

// 1. Fraction of a number
const generateFractionOfNumber = () => {
  const [n, d] = generateFraction();
  const number = (Math.floor(Math.random() * 10) + 2) * d;

  const answer = (n * number) / d;

  return {
    type: "fraction_of_number",
    question: `${n}/${d} of ${number} = ?`,
    answer,
    options: generateNumberOptions(answer)
  };
};

// 2. Equivalent fractions
const generateEquivalentFraction = () => {
  const [n, d] = generateFraction();
  const mul = Math.floor(Math.random() * 5) + 2;

  const answer = fractionToString(n * mul, d * mul);

  return {
    type: "equivalent_fraction",
    question: `Find an equivalent fraction of ${n}/${d}`,
    answer,
    options: []
  };
};

// 3. Simplify fraction
const generateSimplify = () => {
  const base = generateFraction();
  const mul = Math.floor(Math.random() * 5) + 2;

  const n = base[0] * mul;
  const d = base[1] * mul;

  const [sn, sd] = simplify(n, d);

  return {
    type: "simplify",
    question: `Simplify ${n}/${d}`,
    answer: fractionToString(sn, sd),
    options: []
  };
};

/* ================= WORKSHEET 2 ================= */

// 4. Convert to like fractions
const generateLikeFractions = () => {
  const f1 = generateFraction();
  const f2 = generateFraction();

  const common = lcm(f1[1], f2[1]);

  const a = (f1[0] * common) / f1[1];
  const b = (f2[0] * common) / f2[1];

  return {
    type: "like_fraction",
    question: `Convert ${fractionToString(...f1)} and ${fractionToString(...f2)} into like fractions`,
    answer: `${a}/${common}, ${b}/${common}`,
    options: []
  };
};

// 5. Ascending order
const generateAscending = () => {
  const arr = Array.from({ length: 5 }, generateFraction);

  const sorted = [...arr].sort((a, b) => a[0] / a[1] - b[0] / b[1]);

  return {
    type: "ascending",
    question: `Arrange in ascending order: ${arr.map(f => fractionToString(...f)).join(", ")}`,
    answer: sorted.map(f => fractionToString(...f)).join(", "),
    options: []
  };
};

// 6. Descending order
const generateDescending = () => {
  const arr = Array.from({ length: 5 }, generateFraction);

  const sorted = [...arr].sort((a, b) => b[0] / b[1] - a[0] / a[1]);

  return {
    type: "descending",
    question: `Arrange in descending order: ${arr.map(f => fractionToString(...f)).join(", ")}`,
    answer: sorted.map(f => fractionToString(...f)).join(", "),
    options: []
  };
};

// 7. Word problem (cake)
const generateCakeProblem = () => {
  const total = 7;
  const friends = 4;
  const family = 2;
  const self = total - friends - family;

  return {
    type: "word_problem",
    question: `Cake divided into 7 parts. Friends got 4/7, family got 2/7. Who got most and least?`,
    answer: "Most: Friends, Least: Self",
    options: []
  };
};

// 8. Land problem
const generateLandProblem = () => {
  const total = 10;
  const wheat = total / 2;
  const remaining = total - wheat;
  const each = remaining / 2;

  return {
    type: "word_problem_land",
    question: `A farmer has 10 hectares. Half for wheat, rest equally for grains and rice. Find areas.`,
    answer: `Wheat: ${wheat}, Grains: ${each}, Rice: ${each}`,
    options: []
  };
};

/* ================= GENERATOR POOL ================= */

const generators = [
  // old ones
  generateFractionOfNumber,
  generateEquivalentFraction,
  generateSimplify,
  generateLikeFractions,
  generateAscending,
  generateDescending,

  // NEW (Worksheet 3)
  generateImproperToMixed,
  generateMixedToImproper,
  generateIdentifyFraction,

  // NEW (Worksheet 4)
  generateAddFractions,
  generateSubtractFractions,
  generateMissingSubtract,
  generateMissingAdd,

  // NEW (Worksheet 5)
  generateBooksProblem,
  generateTimeProblem,
  generateMangoProblem,
  generateDistanceProblem,
  generateRibbonProblem
];
const generateRandomQuestion = () => {
  const fn = generators[Math.floor(Math.random() * generators.length)];
  return fn();
};

/* ================= NORMALIZER ================= */
const formatAnswer = (ans) => {
  if (typeof ans === "object") {
    const { whole, num, den } = ans;

    if (whole && num && den) return `${whole} ${num}/${den}`;
    if (num && den) return `${num}/${den}`;
    if (whole) return `${whole}`;

    return "";
  }
  return ans;
};
const normalize = (val) =>
  String(val).replace(/\s+/g, "").toLowerCase();

// const isEqualAnswer = (a, b) =>
//   normalize(a) === normalize(b);
/* ================= SMART FRACTION CHECK ================= */

// convert mixed → improper
const toImproper = (str) => {
  str = String(str).trim();

  // mixed number (e.g., 1 5/8)
  if (str.includes(" ")) {
    const [whole, frac] = str.split(" ");
    const [n, d] = frac.split("/").map(Number);

    return [(Number(whole) * d + n), d];
  }

  // simple fraction (e.g., 5/8)
  if (str.includes("/")) {
    return str.split("/").map(Number);
  }

  // whole number
  return [Number(str), 1];
};

// normalize fraction to simplest form
const normalizeFraction = (str) => {
  try {
    let [n, d] = toImproper(str);

    if (!d || isNaN(n) || isNaN(d)) return str;

    const g = gcd(n, d);
    return `${n / g}/${d / g}`;
  } catch {
    return str;
  }
};

const isEqualAnswer = (a, b) => {
  return normalizeFraction(a) === normalizeFraction(b);
};

/* ================= API ================= */

export async function generateFractionwsQuiz(req, res) {
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

export async function checkFractionwsQuiz(req, res) {
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