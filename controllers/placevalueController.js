import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ---------------- HELPERS ---------------- */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

// generate random number (5–6 digits)
// const generateNumber = () => {
//   return Math.floor(Math.random() * 900000) + 10000;
// };
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

    // remove question after checking
    // delete questionsStore[q.id];
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

// /* ---------------- HELPERS ---------------- */

// const shuffle1 = (arr) => arr.sort(() => Math.random() - 0.5);

// // generate MCQ options
// const generateOptions1 = (correct) => {
//   const options = new Set([correct]);

//   while (options.size < 4) {
//     const diff = Math.floor(Math.random() * 10000) - 5000;
//     const fake = Number(correct) + diff;
//     if (fake > 0) options.add(fake);
//   }

//   return shuffle1([...options]);
// };

// /* ---------------- LOGIC FUNCTIONS ---------------- */

// // Q1 - no repetition
// const getSmallestNumber = (digits) => {
//   const sorted = [...digits].sort((a, b) => a - b);

//   // avoid leading zero
//   if (sorted[0] === 0) {
//     const firstNonZero = sorted.findIndex(d => d !== 0);
//     [sorted[0], sorted[firstNonZero]] = [sorted[firstNonZero], sorted[0]];
//   }

//   return Number(sorted.join(""));
// };

// const getGreatestNumber = (digits) => {
//   return Number([...digits].sort((a, b) => b - a).join(""));
// };

// // Q2 - repetition allowed (6 digit)
// // Q2 - CORRECT smallest (matches textbook)
// const getSmallest6Digit = (digits) => {
//   const sorted = [...digits].sort((a, b) => a - b);

//   const firstNonZero = sorted.find(d => d !== 0);
//   const zeros = sorted.filter(d => d === 0);
//   const others = sorted.filter(d => d !== 0 && d !== firstNonZero);

//   let result = [firstNonZero, ...zeros, ...others];

//   // repeat smallest non-zero digit
//   while (result.length < 6) {
//     result.push(firstNonZero);
//   }

//   return Number(result.join(""));
// };


// // Q2 - CORRECT greatest (matches textbook)
// const getGreatest6Digit = (digits) => {
//   const sortedDesc = [...digits].sort((a, b) => b - a);

//   const largest = sortedDesc[0];
//   const zeros = sortedDesc.filter(d => d === 0);
//   const others = sortedDesc.filter(d => d !== largest && d !== 0);

//   let result = [largest];

//   // repeat largest
//   while (result.length < 6 - (others.length + zeros.length)) {
//     result.push(largest);
//   }

//   result = [...result, ...others, ...zeros];

//   return Number(result.join(""));
// };

// /* ---------------- QUESTION GENERATORS ---------------- */

// // Q1
// const generateQ1 = () => {
//   const sets = [
//     [6, 2, 8, 1, 5],
//     [3, 0, 5, 4, 1],
//     [4, 9, 7, 6, 2],
//     [2, 6, 4, 0, 9],
//     [1, 0, 3, 7, 5]
//   ];

//   const digits = sets[Math.floor(Math.random() * sets.length)];

//   const type = Math.random() > 0.5 ? "smallest" : "greatest";

//   const answer =
//     type === "smallest"
//       ? getSmallestNumber(digits)
//       : getGreatestNumber(digits);

//   return {
//     question: `Using digits ${digits.join(", ")}, form the ${type.toUpperCase()} number (use each digit once).`,
//     answer,
//     options: generateOptions1(answer)
//   };
// };

// // Q2
// const generateQ2 = () => {
//   const sets = [
//     [3, 7, 1],
//     [5, 0, 6],
//     [0, 8, 4]
//   ];

//   const digits = sets[Math.floor(Math.random() * sets.length)];

//   const type = Math.random() > 0.5 ? "smallest" : "greatest";

//   const answer =
//     type === "smallest"
//       ? getSmallest6Digit(digits)
//       : getGreatest6Digit(digits);

//   return {
//     question: `Form the ${type.toUpperCase()} 6-digit number using digits ${digits.join(", ")} (you may repeat digits, use each at least once).`,
//     answer,
//     options: generateOptions1(answer)
//   };
// };

// /* ---------------- GENERATE API ---------------- */

// export async function genNumberFormation(req, res) {
//   const questions = [];

//   for (let i = 0; i < 6; i++) {
//     const q = Math.random() > 0.5 ? generateQ1() : generateQ2();
//     const id = uuidv4();

//     await Quiz.create({
//       id,
//       answerStringArr: q,
//       createdAt: new Date(),
//     });

//     questions.push({
//       id,
//       question: q.question,
//       options: q.options
//     });
//   }

//   res.json({ questions });
// }

// /* ---------------- CHECK API ---------------- */

// export async function checkNumberFormation(req, res) {
//   const { userId, answers } = req.body;

//   let score = 0;
//   const correctAnswers = {};

//   for (const q of answers) {
//     const original = await Quiz.findOne({ id: q.id });
//     if (!original) continue;

//     const correct = original.answerStringArr.answer;
//     correctAnswers[q.id] = correct;

//     if (Number(q.answer) === Number(correct)) {
//       score++;
//     }

//     await Quiz.deleteOne({ id: q.id });
//   }

//   if (userId) {
//     await UserProgress.create({
//       user: userId,
//       score,
//       date: new Date()
//     });
//   }

//   res.json({
//     score,
//     total: answers.length,
//     correctAnswers
//   });
// }

