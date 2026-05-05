import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ---------------- HELPERS ---------------- */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);


const generateNumber = (length = 5) => {
  const digits = [];

  while (digits.length < length) {
    const digit = Math.floor(Math.random() * 10);

    // avoid leading zero
    if (digits.length === 0 && digit === 0) continue;

    // ensure no digit repeats
    if (!digits.includes(digit)) {
      digits.push(digit);
    }
  }

  return Number(digits.join(""));
};

// get place value
const getPlaceValue = (digit, position) => {
  return digit * Math.pow(10, position);
};

// generate MCQ options
const generateOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const diff = Math.floor(Math.random() * 1000) - 500;
    const fake = Number(correct) + diff;
    if (fake >= 0) options.add(fake);
  }

  return shuffle([...options]);
};

/* ---------------- QUESTION GENERATOR ---------------- */

const generateFacePlaceQuestion = () => {
  const num = generateNumber().toString();

  const index = Math.floor(Math.random() * num.length);
  const digit = Number(num[index]);

  const position = num.length - index - 1;

  const faceValue = digit;
  const placeValue = getPlaceValue(digit, position);

  return {
    question: `In the number ${num}, what is the PLACE VALUE of the digit ${digit}?`,
    answer: placeValue,
    faceValue,
    number: num,
    digit,
    options: generateOptions(placeValue)
  };
};

/* ---------------- GENERATE API ---------------- */

export async function genFacePlace(req, res) {
  const questions = [];

  for (let i = 0; i < 6; i++) {
    const q = generateFacePlaceQuestion();
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


export async function checkFacePlace(req, res) {
  const { userId, answers } = req.body;

  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format." });
  }

  let score = 0;
  const correctAnswers = {};

  for (const q of answers) {
    const original = await Quiz.findOne({ id: q.id });
   // const original = questionsStore[q.id];
    if (!original) continue;

    correctAnswers[q.id] = original.answerStringArr.answer;

    if (Number(q.answer) === Number(original.answerStringArr.answer)) {
      score++;
    }

   
       await Quiz.deleteOne({ id: q.id });
  }

  if (userId) {
    try {
      await UserProgress.create({
        user: userId,
        score,
        date: new Date()
      });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  }

  res.json({
    score,
    total: answers.length,
    correctAnswers
  });
}
