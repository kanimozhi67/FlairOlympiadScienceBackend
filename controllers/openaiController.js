import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const explainWrongAnswer = async (req, res) => {
  const { question, correctAnswer, userAnswer, level } = req.body;


const prompt = `
You are a friendly teacher for a ${level} level child.

Rules (VERY IMPORTANT):
- Output ONLY mathematical steps
- kindly explain only to wrong answers but not for correct answers
- dont use words for explanation
-  Each step MUST end with a newline character (\n)
-  1–2 emojis for kindergarden students


Question:
${question}

User answer:
${userAnswer}

Correct answer:
${correctAnswer}

Show the correct steps only.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  res.json({
    explanation: response.choices[0].message.content,
  });
};


export const explainWrongAnswer2 = async (req, res) => {
  const { question, correctAnswer, userAnswer, level } = req.body;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    max_tokens: 200,
    messages: [
      {
        role: "system",
        content: `
You are a friendly teacher for a ${level} level child.

STRICT RULES:
- Output ONLY mathematical steps
- kindly explain only to wrong answers but not for correct answers
- Use short, simple sentences
- Each sentence on a new line
- Use numbers and simple words
-maximum 5 lines
- Maximum 1 emoji at the end
- Do NOT number steps
- kindly explain all the wrong answers
`
      },
      {
        role: "user",
        content: `
Question:
${question}

User answer:
${userAnswer}

Correct answer:
${correctAnswer}

Explain why the correct answer is right.
`
      }
    ]
  });

  res.json({
    explanation: response.choices[0].message.content
  });
};
export const explainWrongAnswer3 = async (req, res) => {
  const { question, level } = req.body;


const prompt = `
You are a friendly teacher for a ${level} level child.

Rules (VERY IMPORTANT):
- Output ONLY science answers.
-  Each step MUST end with a newline character (\n)
-  1–2 emojis for kindergarden students
-Maximum 10 lines


Question:
${question}


Show the correct steps only.
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.4,
    max_tokens: 300,
    messages: [{ role: "user", content: prompt }],
  });

  res.json({
    explanation: response.choices[0].message.content,
  });
};

