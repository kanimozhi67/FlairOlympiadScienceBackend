import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";
import { v4 as uuidv4 } from "uuid";


// In-memory store for generated questions (keyed by id)
const questionsStore = {}; // { [id]: { a, b, operator, answer } }

// Generate multiple random questions
const AddSub =async(n, t, req, res, l = 0) => {
  const questions = [];

 
const docs = [];
  for (let i = 0; i < n; i++) {
    // generate 5 questions
    let a = Math.floor(Math.random() * t) + l; // 0 to t-1
    let b = Math.floor(Math.random() * 10) + l;
    const operator = Math.random() < 0.5 ? "+" : "-";

    // Prevent negative subtraction
    if (operator === "-" && b > a) [a, b] = [b, a];

    const answer = operator === "+" ? a + b : a - b;
   
const id = uuidv4();
 docs.push({ id, a, b, operator, answer });
  
  // await Quiz.create({
  //     id,
  //     a,
  //     b,
  //     operator,
  //     answer,
  //     createdAt: new Date(),
  //   });

    // Send only necessary info to frontend (no answer)
    // questions.push({ id, a, b, operator });
  }
await Quiz.insertMany(docs);

res.json({
  questions: docs.map(({ id, a, b, operator }) => ({
    id, a, b, operator
  }))
});
  // res.json({ questions });
};

const  addsub3=async(b, req, res, t)=> {
    const questions = [];
  const q = [];
  const mul = b;
  // generate skip-count numbers
  let start = Math.floor(Math.random() * 4) + 2;
  const docs = [];
  for (let i = 0; i < 5; i++) {
    q.push((start + i * t) * b);
  }
const skip=q[1]-q[0];

  // choose missing index
  const missingIndex = Math.floor(Math.random() * 3)+2;
  const answer = q[missingIndex];
  q[missingIndex] = null;

const id = uuidv4();


  await Quiz.create({
      id,
      answer,
      createdAt: new Date(),
    });

  questions.push({
    id,
    q,
    operator: "×",
  });

  res.json({ questions });

 
}

export function generateQuestionAddSub(req, res) {
  AddSub(5, 10, req, res);
}
// export function generateQuestionAddsub3(req, res) {

//    const t=Math.floor(Math.random() * 4)+2; // 2-5
//    const b = Math.floor(Math.random() * 9)+2; // 3

//   addsub3( b,req, res,t);
// }

export function generateQuestionAddSub3(req, res) {
  // AddSub(3, 15, req, res);
  const t = Math.floor(Math.random() * 4) + 2; // 2-5
  const b = Math.floor(Math.random() * 2) +1 ; // 2

  addsub3(b, req, res, t);
}
export async function checkAddCircle(req, res) {
  const { userId, answers } = req.body;

  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format." });
  }

  let score = 0;
  const results = {};

  for (const q of answers) {
    // const original = questionsStore[q.id];
      const original = await Quiz.findOne({ id: q.id });
    if (!original) continue;

    const isAnswerCorrect = Number(q.answer) === original.answer;
 

    if (isAnswerCorrect) score++;

    results[q.id] = {
      correctAnswer: original.answer,
    userAnswer: q.answer,
  isCorrect: isAnswerCorrect,
    };
    await Quiz.deleteOne({ id: q.id });
    // delete questionsStore[q.id]; // cleanup
  }
  score = score * 3;
  if (userId) {
    try {
      await UserProgress.create({
        user: userId,
        score,
        date: new Date(),
      });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  }

  res.json({ score, results });
}

export function generateQuestionAddSubp(req, res) {
  AddSub(5, 90, req, res, 10);
}
export function generateQuestionAddSubp2(req, res) {
  AddSub(5, 900, req, res, 100);
}
export function generateQuestionAddSubp3(req, res) {
  // AddSub(5, 10000, req, res, 1000);
   const t = Math.floor(Math.random() * 40) + 2; // 2-5
  const b = Math.floor(Math.random() * 5) +1 ; // 2

  addsub3(b, req, res, t);
}

const mult=async(b, req, res, t = 16)=> {
  const questions = [];
const docs=[];
  for (let i = 0; i < 5; i++) {
    // generate 5 questions
    const a = Math.floor(Math.random() * t); // 0–15

    const operator = "×"; // or "*"

    const answer = a * b;
   const id = uuidv4();

 docs.push({ id, a, b, operator, answer });
   
  // await Quiz.create({
  //     id,
  //     a,
  //     b,
  //     operator,
  //     answer,
  //     createdAt: new Date(),
  //   });

  //   // Send only the question to frontend
  //   questions.push({ id, a, b, operator });
  }

  // res.json({ questions });
  await Quiz.insertMany(docs);

res.json({
  questions: docs.map(({ id, a, b, operator }) => ({
    id, a, b, operator
  }))
});
}
export function generateQuestionMul(req, res) {
  mult(2, req, res);
}
export function generateQuestionMul2(req, res) {
  mult(10, req, res);
}
export function generateQuestionMul3(req, res) {
  mult(5, req, res);
}
const mult2=async(req, res, t, u = 0)=> {
  const questions = [];

  for (let i = 0; i < 5; i++) {
    // generate 5 questions
    const a = Math.floor(Math.random() * 21); // 0–20
    const b = Math.floor(Math.random() * t) + u;
    const operator = "×"; // or "*"

    const answer = a * b;
 const id=uuidv4();

  docs.push({ id, a, b, operator, answer });
  // await Quiz.create({
  //     id,
  //     a,
  //     b,
  //     operator,
  //     answer,
  //     createdAt: new Date(),
  //   });

  //   // Send only the question to frontend
  //   questions.push({ id, a, b, operator });
  }
  await Quiz.insertMany(docs);

res.json({
  questions: docs.map(({ id, a, b, operator }) => ({
    id, a, b, operator
  }))
});

  // res.json({ questions });
}
const mult3=async(b, req, res, t)=> {
  const questions = [];
  const q = [];
  const mul = b;
  // generate skip-count numbers
  let start = Math.floor(Math.random() * 4) + 2;
  for (let i = 0; i < 5; i++) {
    q.push((start + i * t) * b);
  }
const skip=q[1]-q[0];

  // choose missing index
  const missingIndex = Math.floor(Math.random() * 5);
  const answer = q[missingIndex];
  q[missingIndex] = null;

const id = uuidv4();



  await Quiz.create({
      id,
      mul,
      skip,
    
      answer,
      createdAt: new Date(),
    });




  questions.push({
    id,
    q,
    answer,
    mul: b,
    skip,
    operator: "×",
  });

  res.json({ questions });
}

export function generateQuestionMulp(req, res) {
  mult(20, req, res, 50);
}
export function generateQuestionMulp2(req, res) {
  mult2(req, res, 11, 2);
}
export function generateQuestionMulp3(req, res) {
  const t = Math.floor(Math.random() * 4) + 2; // 2-5
  const b = Math.floor(Math.random() * 9) + 2; // 0–10
  mult3(b, req, res, t);
}

export async function checkAnswer(req, res) {
  const { userId, answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format." });
  }

  let score = 0;
  const correctAnswers = {};

  for (const q of answers) {
    // const original = questionsStore[q.id];
     const original = await Quiz.findOne({ id: q.id });
    if (!original) continue;

    correctAnswers[q.id] = original.answer;

    if (Number(q.answer) === original.answer) score++;

    // Optional: remove question from store after checking
    // delete questionsStore[q.id];
        await Quiz.deleteOne({ id: q.id });
  }

  if (userId) {
    try {
      await UserProgress.create({
        user: userId,
        score,
        date: new Date(),
      });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  }

  res.json({ score, correctAnswers });
}
export async function checkAnswerCircle(req, res) {
  const { userId, answers } = req.body;

  if (!Array.isArray(answers)) {
    return res.status(400).json({ error: "Invalid answers format." });
  }

  let score = 0;
  const results = {};

  for (const q of answers) {
    // const original = questionsStore[q.id];
     const original = await Quiz.findOne({ id: q.id });
    if (!original) continue;

    const isAnswerCorrect = Number(q.answer) === original.answer;
    const isMulCorrect = Number(q.mul) === original.mul;
    const isSkipCorrect = Number(q.skip) === original.skip;

    if (isAnswerCorrect) score++;
    if (isMulCorrect) score++;
    if (isSkipCorrect) score++;

    results[q.id] = {
      correctAnswer: original.answer,
      correctMul: original.mul,
      correctSkip: original.skip,
      userAnswer: q.answer,
      userMul: q.mul,
      userSkip: q.skip,
      isCorrect: isAnswerCorrect && isMulCorrect && isSkipCorrect,
    };
    await Quiz.deleteOne({ id: q.id });
    // delete questionsStore[q.id]; // cleanup
  }
  score = score * 3;
  if (userId) {
    try {
      await UserProgress.create({
        user: userId,
        score,
        date: new Date(),
      });
    } catch (err) {
      console.error("Error saving progress:", err);
    }
  }

  res.json({ score, results });
}

const div=async(t, req, res,s=13)=> {
  const questions = [];
  const docs=[];
  for (let i = 0; i < 5; i++) {
    // generate 5 questions
    const d = Math.floor(Math.random() * s)+2; // 0–15
 const b = Math.floor(Math.random() * t)+2; // 0-9
    const operator = "➗"; // or "*"
const a =d *b;
    const answer = a / b;
   const id = uuidv4();

  docs.push({ id, a, b, operator, answer });
  // await Quiz.create({
  //     id,
  //     a,
  //     b,
  //     operator,
  //     answer,
  //     createdAt: new Date(),
  //   });
  //   // Send only the question to frontend
  //   questions.push({ id, a, b, operator });
  }

  // res.json({ questions });
  await Quiz.insertMany(docs);

res.json({
  questions: docs.map(({ id, a, b, operator }) => ({
    id, a, b, operator
  }))
});
}
const div3=async( req, res)=> {
  const questions = [];
   const docs=[];
  for (let i = 0; i < 5; i++) {
    // generate 5 questions
    const d =  ( Math.floor((Math.random() * 900)))+9;// 0–15
 
     const b = Math.floor(Math.random() * 8)+2; // 2 to 9
const e= d*b;
const a=e/100;
    const operator = "➗"; // or "*"

    const answer = a / b;
   const id = uuidv4();
 docs.push({ id, a, b, operator, answer });

  // await Quiz.create({
  //     id,
  //     a,
  //     b,
  //     operator,
  //     answer,
  //     createdAt: new Date(),
  //   });
  //   // Send only the question to frontend
  //   questions.push({ id, a, b, operator });
  }

  // res.json({ questions });
  await Quiz.insertMany(docs);

res.json({
  questions: docs.map(({ id, a, b, operator }) => ({
    id, a, b, operator
  }))
});
}
export function generateQuestionDiv(req, res) {
  div(4, req, res);
}
export function generateQuestionDiv2(req, res) {
  
  div(8, req, res,100);
}
export function generateQuestionDiv3(req, res) {
  
  
  div3( req, res);
}