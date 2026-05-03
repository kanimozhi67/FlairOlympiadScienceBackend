import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ---------------- HELPERS ---------------- */

// number → words
const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const teens = [
  "ten", "eleven", "twelve", "thirteen", "fourteen",
  "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"
];

const tens = [
  "", "", "twenty", "thirty", "forty",
  "fifty", "sixty", "seventy", "eighty", "ninety"
];

const numberToWords = (num) => {
  if (num === 0) return "zero";

  const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  const convertHundreds = (n) => {
    let res = "";

    if (n >= 100) {
      res += ones[Math.floor(n / 100)] + " hundred";
      n %= 100;
      if (n > 0) res += " ";
    }

    if (n >= 10 && n < 20) {
      res += teens[n - 10];
    } else {
      if (n >= 20) {
        res += tens[Math.floor(n / 10)];
        n %= 10;
        if (n > 0) res += " ";
      }
      if (n > 0 && n < 10) {
        res += ones[n];
      }
    }

    return res.trim();
  };

  let result = "";

  const thousands = Math.floor(num / 1000);
  const remainder = num % 1000;

  if (thousands > 0) {
    result += convertHundreds(thousands) + " thousand";
    if (remainder > 0) result += " ";
  }

  if (remainder > 0) {
    result += convertHundreds(remainder);
  }

  return result.trim().replace(/\s+/g, " ");
};
// words → number
const wordToNumber = (str) => {
  const map = {
    zero: 0, one: 1, two: 2, three: 3, four: 4,
    five: 5, six: 6, seven: 7, eight: 8, nine: 9,
    ten: 10, eleven: 11, twelve: 12, thirteen: 13,
    fourteen: 14, fifteen: 15, sixteen: 16,
    seventeen: 17, eighteen: 18, nineteen: 19,
    twenty: 20, thirty: 30, forty: 40,
    fifty: 50, sixty: 60, seventy: 70,
    eighty: 80, ninety: 90
  };

  let words = str.toLowerCase().replace(/-/g, " ").split(" ");
  let total = 0;
  let current = 0;

  for (let word of words) {
    if (map[word] !== undefined) {
      current += map[word];
    } else if (word === "hundred") {
      current *= 100;
    } else if (word === "thousand") {
      total += current * 1000;
      current = 0;
    }
  }

  return total + current;
};

// random number (5–6 digits)
const generateNumber = () => {
  return Math.floor(Math.random() * 900000) + 10000;
};

// normalize for checking
const normalize = (str) =>
  str
    .toLowerCase()
    .replace(/-/g, " ")
    .replace(/\band\b/g, "")
    .replace(/[^a-z\s]/g, "") // 🔥 remove hidden chars
    .replace(/\s+/g, " ")
    .trim();
/* ---------------- QUESTION GENERATOR ---------------- */

const generatePlaceValueQuestion = () => {
  const isNumToWord = Math.random() > 0.5;

  if (isNumToWord) {
    const num = generateNumber();

    return {
      question: `Write the number in words:\n${num}`,
      answer: numberToWords(num),
      type: "numToWord",
    };
  } else {
    const num = generateNumber();
    const words = numberToWords(num);

    return {
      question: `Write the number in digits:\n${words}`,
      answer: num,
      type: "wordToNum",
    };
  }
};

/* ---------------- GENERATE API ---------------- */

export async function genIPlaceValue(req, res) {
  try {
    const questions = [];

    for (let i = 0; i < 6; i++) {
      const q = generatePlaceValueQuestion();
      const id = uuidv4();

      await Quiz.create({
        id,
        question: q.question,
        answerStringArr: q.answer, // ✅ correct field
        type: q.type,
        createdAt: new Date(),
      });

      questions.push({
        id,
        question: q.question,
        type: q.type,
      });
    }

    res.json({ questions });
  } catch (err) {
    console.error("Generate Error:", err);
    res.status(500).json({ error: "Failed to generate questions" });
  }
}

/* ---------------- CHECK ANSWERS ---------------- */

export async function checkIPlaceValue(req, res) {
  try {
    const { userId, answers } = req.body;

    let score = 0;
    const correctAnswers = {};

    for (const q of answers) {
      const original = await Quiz.findOne({ id: q.id });
      if (!original) continue;

      const correct = original.answerStringArr;
      correctAnswers[q.id] = correct;

      if (original.type === "numToWord") {
       let rawAnswer = q.answer;

if (typeof rawAnswer === "object") {
  rawAnswer = rawAnswer?.value || rawAnswer?.answer || "";
}

const userAns = normalize(String(rawAnswer));
const correctAns = normalize(String(correct));

     console.log("USER RAW:", rawAnswer);
console.log("CORRECT RAW:", correct);

console.log("USER:", userAns);
console.log("CORRECT:", correctAns);
if (userAns === correctAns) {


          score++;
        }
      } else {
        if (Number(q.answer) === Number(correct)) {
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