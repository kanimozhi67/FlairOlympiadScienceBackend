import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ---------------- HELPERS ---------------- */

// Roman map
const romanMap = [
  { value: 1000, numeral: "M" },
  { value: 900, numeral: "CM" },
  { value: 500, numeral: "D" },
  { value: 400, numeral: "CD" },
  { value: 100, numeral: "C" },
  { value: 90, numeral: "XC" },
  { value: 50, numeral: "L" },
  { value: 40, numeral: "XL" },
  { value: 10, numeral: "X" },
  { value: 9, numeral: "IX" },
  { value: 5, numeral: "V" },
  { value: 4, numeral: "IV" },
  { value: 1, numeral: "I" },
];

// Number → Roman
const toRoman = (num) => {
  let result = "";
  for (let i of romanMap) {
    while (num >= i.value) {
      result += i.numeral;
      num -= i.value;
    }
  }
  return result;
};

// Roman → Number
const fromRoman = (str) => {
  const map = {
    I: 1, V: 5, X: 10, L: 50,
    C: 100, D: 500, M: 1000
  };

  let total = 0;

  for (let i = 0; i < str.length; i++) {
    const curr = map[str[i]];
    const next = map[str[i + 1]];

    if (next && curr < next) {
      total += next - curr;
      i++;
    } else {
      total += curr;
    }
  }

  return total;
};

// normalize Roman
const normalizeRoman = (str) =>
  String(str).toUpperCase().replace(/[^IVXLCDM]/g, "").trim();

/* ---------------- QUESTION DATA ---------------- */

const numbersQ1 = [14, 78, 54, 129, 45, 282, 313, 28];

const romanQ2 = ["XXVIII", "VII", "LXXV", "XXII", "XCII", "XCIX", "IX", "LVI"];

const multiplicationQ3 = [
  [2, 5],
  [6, 8],
  [3, 9],
  [7, 7],
  [4, 7],
  [5, 6],
];

/* ---------------- GENERATOR ---------------- */

const generateRomanQuestion = () => {
  const rand = Math.floor(Math.random() * 3);

  // 1️⃣ Number → Roman
  if (rand === 0) {
    const num = numbersQ1[Math.floor(Math.random() * numbersQ1.length)];

    return {
      question: `Write Roman numeral for:\n${num}`,
      answerString: toRoman(num),
      kind: "numToRoman",
    };
  }

  // 2️⃣ Roman → Number
  if (rand === 1) {
    const roman = romanQ2[Math.floor(Math.random() * romanQ2.length)];

    return {
      question: `Convert into number:\n${roman}`,
      answerString: String(fromRoman(roman)),
      kind: "romanToNum",
    };
  }

  // 3️⃣ Multiplication → Roman
  const [a, b] =
    multiplicationQ3[Math.floor(Math.random() * multiplicationQ3.length)];

  const result = a * b;

  return {
    question: `${a} × ${b} = ? (Write in Roman numerals)`,
    answerString: toRoman(result),
    kind: "multiplyRoman",
  };
};

/* ---------------- GENERATE API ---------------- */

export async function genRomanQuiz(req, res) {
  try {
    const questions = [];

    for (let i = 0; i < 6; i++) {
      const q = generateRomanQuestion();
      const id = uuidv4();

      await Quiz.create({
        id,
        question: q.question,
        answerString: q.answerString,
        kind: q.kind, // ✅ FIXED
        createdAt: new Date(),
      });

      questions.push({
        id,
        question: q.question,
        kind: q.kind,
      });
    }

    res.json({ questions });
  } catch (err) {
    console.error("Generate Error:", err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
}

/* ---------------- CHECK API ---------------- */

export async function checkRomanQuiz(req, res) {
  try {
    const { userId, answers } = req.body;

    let score = 0;
    const correctAnswers = {};

    for (const q of answers) {
      const original = await Quiz.findOne({ id: q.id });
      if (!original) continue;

      const correct = String(original.answerString).trim();
      correctAnswers[q.id] = correct;

      let userAns = q.answer;

      // handle AntD input
      if (typeof userAns === "object") {
        userAns = userAns?.value || userAns?.target?.value || "";
      }

      userAns = String(userAns).trim();

      const userNorm = normalizeRoman(userAns);
      const correctNorm = normalizeRoman(correct);

      // Roman answers
      if (
        original.kind === "numToRoman" ||
        original.kind === "multiplyRoman"
      ) {
        if (userNorm === correctNorm) {
          score++;
        }
      }

      // Number answers
      else if (original.kind === "romanToNum") {
        if (Number(userAns) === Number(correct)) {
          score++;
        }
      }

      await Quiz.deleteOne({ id: q.id });
    }

    if (userId) {
      await UserProgress.create({
        user: userId,
        score,
        date: new Date(),
      });
    }

    res.json({
      score,
      total: answers.length,
      correctAnswers,
    });
  } catch (err) {
    console.error("Check Error:", err);
    res.status(500).json({ error: "Error checking answers" });
  }
}