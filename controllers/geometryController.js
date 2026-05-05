import { v4 as uuidv4 } from "uuid";
import UserProgress from "../models/UserProgress.js";
import Quiz from "../models/Quiz.js";


/* ================= GEOMETRY HELPERS ================= */
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const generateOptions = (correct) => {
  const options = new Set([correct]);

  while (options.size < 4) {
    const variation = Math.floor(Math.random() * 20) - 10;
    const val = correct + variation;
    if (val > 0) options.add(val);
  }

  return shuffle([...options]);
};

const TF_OPTIONS = ["✅ Yes", "❌ No"];
const mapBooleanToKid = (val) => (val ? "✅ Yes" : "❌ No");

const getRectanglePerimeter = (l, b) => 2 * (l + b);
const getSquarePerimeter = (s) => 4 * s;

/* Approx area (grid counting simulation) */
const generateGridArea = () => {
  const width = Math.floor(Math.random() * 5) + 3;
  const height = Math.floor(Math.random() * 5) + 3;

  const area = width * height;

  return {
    width,
    height,
    area
  };
};

/* Line measurement simulation */
const generateLineLength = () => {
  return Math.floor(Math.random() * 15) + 1; // cm
};
const geometryStaticQuestions = [
  {
    type: "true_false_geometry",
    question: "Closed figures start and end at the same point.",
    answer: mapBooleanToKid(true),
    options: TF_OPTIONS
  },
  {
    type: "true_false_geometry",
    question: "Open figures start and end at the same point.",
    answer: mapBooleanToKid(false),
    options: TF_OPTIONS
  },
  {
    type: "true_false_geometry",
    question: "Opposite sides of a rectangle are equal and parallel.",
    answer: mapBooleanToKid(true),
    options: TF_OPTIONS
  },
  {
    type: "true_false_geometry",
    question: "The meeting point of two line segments is called a vertex.",
    answer: mapBooleanToKid(true),
    options: TF_OPTIONS
  }
];
const generateRectanglePerimeter = () => {
  const l = Math.floor(Math.random() * 20) + 1;
  const b = Math.floor(Math.random() * 20) + 1;

  const perimeter = getRectanglePerimeter(l, b);

  return {
    type: "perimeter_rectangle",
    question: `Find the perimeter of rectangle with length ${l} cm and breadth ${b} cm`,
    answer: perimeter,
    options: generateOptions(perimeter)
  };
};
const generateSquarePerimeter = () => {
  const s = Math.floor(Math.random() * 20) + 1;

  const perimeter = getSquarePerimeter(s);

  return {
    type: "perimeter_square",
    question: `Find the perimeter of square with side ${s} cm`,
    answer: perimeter,
    options: generateOptions(perimeter)
  };
};
const generateWordProblem = () => {
  const l = Math.floor(Math.random() * 50) + 10;
  const b = Math.floor(Math.random() * 30) + 5;

  const perimeter = getRectanglePerimeter(l, b);

  return {
    type: "word_problem_perimeter",
    question: `A park has length ${l} m and breadth ${b} m. Find its perimeter.`,
    answer: perimeter,
    options: generateOptions(perimeter)
  };
};
const generateAreaQuestion = () => {
  const grid = generateGridArea();

  return {
    type: "area_count_grid",
    question: `Find the area of a rectangle grid of ${grid.width} by ${grid.height} squares (1 sq cm each)`,
    answer: grid.area,
    options: generateOptions(grid.area)
  };
};
// const generateMeasurementQuestion = () => {
//   const length = generateLineLength();

//   return {
//     type: "measurement_line",
//     question: `Measure the line (approx). Length is around ___ cm`,
//     answer: length,
//     options: generateOptions(length)
//   };
// };
const generateGeometryTF = () => {
  const statements = [
    { q: "A triangle has 4 sides", a: false },
    { q: "A square has all equal sides", a: true },
    { q: "Parallel lines meet", a: false },
    { q: "Perpendicular lines form right angle", a: true }
  ];

  const pick = statements[Math.floor(Math.random() * statements.length)];

  return {
    type: "true_false_geometry",
    question: pick.q,
    answer: mapBooleanToKid(pick.a),
    options: TF_OPTIONS
  };
};

const generateMeasurementQuestion = () => {
  const length = generateLineLength();

  return {
    type: "measurement_line",
    question: `Measure the line and choose the correct length.`,
    answer: length,
    options: generateOptions(length),

    meta: {
      length // 👈 IMPORTANT
    }
  };
};
const generators = [
 
  generateRectanglePerimeter,   
  generateSquarePerimeter,
  generateWordProblem,
  generateAreaQuestion,
//   generateMeasurementQuestion,
  generateGeometryTF
];

const generateRandomQuestion = () => {
  const useStatic = Math.random() < 0.3;

  if (useStatic) {
    return geometryStaticQuestions[
      Math.floor(Math.random() * geometryStaticQuestions.length)
    ];
  }

  const fn = generators[Math.floor(Math.random() * generators.length)];
  return fn();
};

export async function generateGeometryQuiz(req, res) {
  try {
    const questions = [];

    for (let i = 0; i < 10; i++) {
      const q = generateRandomQuestion();
      const id = uuidv4();

      await Quiz.create({
        id,
        answerStringArr: q, // store full object
        createdAt: new Date(),
      });

      questions.push({
        id,
        type: q.type,
        question: q.question,
        options: q.options || null,

        // frontend hints
        meta: {
          showGrid: q.type === "area_count_grid",
          showRuler: q.type === "measurement_line",
          isWordProblem: q.type === "word_problem_perimeter"
        }
      });
    }

    res.json({ questions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
}
const normalize = (val) => {
  if (val === true || val === "true" || val === "✅ Yes") return "yes";
  if (val === false || val === "false" || val === "❌ No") return "no";
  return String(val).trim();
};
const isEqualAnswer = (userAns, correctAns) => {
  return normalize(userAns) === normalize(correctAns);
};
export async function checkGeometryQuiz(req, res) {
  try {
    const { userId, answers } = req.body;

    let score = 0;
    const correctAnswers = {};

    for (const q of answers) {
      const original = await Quiz.findOne({ id: q.id });
      if (!original) continue;

      const correct = original.answerStringArr.answer;

      correctAnswers[q.id] = correct;

      if (isEqualAnswer(q.answer, correct)) {
        score++;
      }

      // cleanup after checking
      await Quiz.deleteOne({ id: q.id });
    }

    // store progress
    if (userId) {
      await UserProgress.create({
        user: userId,
        score,
        total: answers.length,
        topic: "geometry",
        date: new Date()
      });
    }

    res.json({
      score,
      total: answers.length,
      correctAnswers
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to check quiz" });
  }
}