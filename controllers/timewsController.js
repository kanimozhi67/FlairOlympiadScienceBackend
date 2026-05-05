import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";

/* ================= HELPERS ================= */

const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);
const generateNumberOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const variation = Math.floor(Math.random() * 20) + 1;
    const sign = Math.random() > 0.5 ? 1 : -1;

    let val = Number(correct) + sign * variation;

    if (!isNaN(val) && val >= 0) {
      options.add(val);
    }
  }

  return shuffle([...options]);
};

/* ================= TIME HELPERS ================= */

const toSeconds = (min = 0, sec = 0) => min * 60 + sec;

const toMinutes = (hr = 0, min = 0) => hr * 60 + min;

const formatTime12 = (hours24, minutes) => {
  let period = hours24 >= 12 ? "PM" : "AM";
  let h = hours24 % 12;
  if (h === 0) h = 12;
  return `${h}:${minutes.toString().padStart(2, "0")} ${period}`;
};

const durationBetween = (startH, startM, endH, endM) => {
  let start = startH * 60 + startM;
  let end = endH * 60 + endM;

  if (end < start) end += 24 * 60; // next day case

  const diff = end - start;
  return {
    hours: Math.floor(diff / 60),
    minutes: diff % 60
  };
};
const generateTimeFillBlank = () => {
  const qs = [
    { q: "1 minute = ___ seconds", a: 60 },
    { q: "60 minutes = ___ hour", a: 1 },
    { q: "1 year = ___ weeks", a: 52 },
    { q: "24 hours = ___ day", a: 1 },
    { q: "365 days = ___ year", a: 1 }
  ];

  const item = qs[Math.floor(Math.random() * qs.length)];

  return {
    type: "time_fill_blank",
    question: item.q,
    answer: item.a,
    options: generateNumberOptions(item.a)
  };
};
const generateMinutesToSeconds = () => {
  const min = Math.floor(Math.random() * 60) + 1;
  const sec = Math.random() > 0.5 ? Math.floor(Math.random() * 60) : 0;

  const total = toSeconds(min, sec);

  return {
    type: "time_convert_seconds",
    question: `${min} minutes ${sec ? sec + " seconds" : ""} into seconds`,
    answer: total,
    options: generateNumberOptions(total)
  };
};
const generateHoursToMinutes = () => {
  const hr = Math.floor(Math.random() * 12) + 1;
  const min = Math.floor(Math.random() * 60);

  const total = toMinutes(hr, min);

  return {
    type: "time_convert_minutes",
    question: `${hr} hours ${min} minutes into minutes`,
    answer: total,
    options: generateNumberOptions(total)
  };
};
const generateClockConversion = () => {
  const h = Math.floor(Math.random() * 24);
  const m = Math.floor(Math.random() * 60);

  const answer = formatTime12(h, m);

  return {
    type: "time_12hr",
    question: `${h.toString().padStart(2, "0")}${m
      .toString()
      .padStart(2, "0")} hours in 12-hour format`,
    answer,
    options: shuffle([
      answer,
      formatTime12((h + 1) % 24, m),
      formatTime12((h + 2) % 24, m),
      formatTime12((h + 3) % 24, m)
    ])
  };
};
const generateTimeAddition = () => {
  const h1 = Math.floor(Math.random() * 12);
  const m1 = Math.floor(Math.random() * 60);

  const h2 = Math.floor(Math.random() * 12);
  const m2 = Math.floor(Math.random() * 60);

  let m = m1 + m2;
  let h = h1 + h2;

  if (m >= 60) {
    h += Math.floor(m / 60);
    m = m % 60;
  }

  const answer = `${h} hours ${m} minutes`;

  return {
    type: "time_add",
    question: `${h1}h ${m1}m + ${h2}h ${m2}m`,
    answer,
    options: shuffle([
      answer,
      `${h + 1} hours ${m} minutes`,
      `${h} hours ${m + 5} minutes`,
      `${h - 1} hours ${m} minutes`
    ])
  };
};
const generateTimeSubtraction = () => {
  let h1 = Math.floor(Math.random() * 20) + 5;
  let m1 = Math.floor(Math.random() * 60);

  let h2 = Math.floor(Math.random() * h1);
  let m2 = Math.floor(Math.random() * 60);

  let m = m1 - m2;
  let h = h1 - h2;

  if (m < 0) {
    h -= 1;
    m += 60;
  }

  const answer = `${h} hours ${m} minutes`;

  return {
    type: "time_subtract",
    question: `${h1}h ${m1}m - ${h2}h ${m2}m`,
    answer,
    options: shuffle([
      answer,
      `${h + 1} hours ${m} minutes`,
      `${h} hours ${m + 10} minutes`,
      `${h - 1} hours ${m} minutes`
    ])
  };
};
const generateTimeDuration = () => {
  const sh = Math.floor(Math.random() * 24);
  const sm = Math.floor(Math.random() * 60);

  const eh = Math.floor(Math.random() * 24);
  const em = Math.floor(Math.random() * 60);

  const d = durationBetween(sh, sm, eh, em);

  const answer = `${d.hours} hours ${d.minutes} minutes`;

  return {
    type: "time_duration",
    question: `From ${formatTime12(sh, sm)} to ${formatTime12(eh, em)}`,
    answer,
    options: shuffle([
      answer,
      `${d.hours + 1} hours ${d.minutes} minutes`,
      `${d.hours} hours ${d.minutes + 10} minutes`,
      `${Math.max(0, d.hours - 1)} hours ${d.minutes} minutes`
    ])
  };
};
const generators = [
 
  generateTimeFillBlank,
  generateMinutesToSeconds,
  generateHoursToMinutes,
  generateClockConversion,
  generateTimeAddition,
  generateTimeSubtraction,
  generateTimeDuration
];
const generateRandomQuestion = () => {
  const fn = generators[Math.floor(Math.random() * generators.length)];
  return fn();
};
const normalize = (val) => {
  if (!val) return "";

  return String(val)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/hours?/g, "h")
    .replace(/minutes?/g, "m")
    .replace(/seconds?/g, "s");
};

const isEqualAnswer = (userAns, correctAns) => {
  return normalize(userAns) === normalize(correctAns);
};
export async function generateTimeQuiz(req, res) {
  try {
    const { count = 10 } = req.body || {};
    const questions = [];

    for (let i = 0; i < count; i++) {
      const q = generateRandomQuestion();
      const id = uuidv4();

      await Quiz.create({
        id,
        data: q, // store full question object
        createdAt: new Date()
      });

      questions.push({
        id,
        type: q.type,
        question: q.question,
        options: q.options
      });
    }

    res.json({
      success: true,
      questions
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
}
export async function checkTimeQuiz(req, res) {
  try {
    const { userId, answers } = req.body;

    let score = 0;
    const correctAnswers = {};

    for (const q of answers) {
      const original = await Quiz.findOne({ id: q.id });
    if (!original || !original.data) {
  console.warn("Missing data for id:", q.id);
  continue;
}

      const correct = original.data.answer;
      correctAnswers[q.id] = correct;

      if (isEqualAnswer(q.answer, correct)) {
        score++;
      }

      // cleanup
      await Quiz.deleteOne({ id: q.id });
    }

    // save progress
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