// api/bfhl.js
// Vercel Serverless Function – /api/bfhl (rewritten to /bfhl via vercel.json)

// 🔧 EDIT THESE 4 CONSTANTS BEFORE PUSHING
const FULL_NAME = "basil shaiju";        
const DOB_DDMMYYYY = "04122004";                
const EMAIL = "basil.shaiju2022@vitstudent.ac.in";   
const ROLL_NUMBER = "22bci0064";         

function makeUserId(fullName, dob) {
  const normalized = String(fullName).trim().toLowerCase().replace(/\s+/g, "_");
  return `${normalized}_${dob}`;
}

function isIntegerString(s) {
  return typeof s === "string" && /^-?\d+$/.test(s.trim());
}

function isAlphaString(s) {
  return typeof s === "string" && /^[A-Za-z]+$/.test(s.trim());
}

function classify(dataArray) {
  const odd_numbers = [];
  const even_numbers = [];
  const alphabets = [];
  const special_characters = [];
  let sum = 0;
  let allLetters = [];

  for (let item of dataArray) {
    const str = (item === null || item === undefined) ? "" : String(item);
    const trimmed = str.trim();

    if (isIntegerString(trimmed)) {
      const n = parseInt(trimmed, 10);
      if (n % 2 === 0) even_numbers.push(trimmed);
      else odd_numbers.push(trimmed);
      sum += n;
      continue;
    }

    if (isAlphaString(trimmed)) {
      alphabets.push(trimmed.toUpperCase());
      allLetters.push(...trimmed);
      continue;
    }

    if (trimmed.length > 0) special_characters.push(trimmed);
  }

  const reversedLetters = allLetters.reverse();
  const concat_string = reversedLetters
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");

  return {
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: String(sum),
    concat_string,
  };
}

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();

  if (req.method !== "POST") {
    return res.status(405).json({
      is_success: false,
      message: "Method Not Allowed. Use POST on /bfhl",
    });
  }

  try {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    const data = Array.isArray(body.data) ? body.data : null;

    if (!data) {
      return res.status(400).json({
        is_success: false,
        user_id: makeUserId(FULL_NAME, DOB_DDMMYYYY),
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        message: "Invalid payload. Expected { data: [...] }",
      });
    }

    const result = classify(data);

    return res.status(200).json({
      is_success: true,
      user_id: makeUserId(FULL_NAME, DOB_DDMMYYYY),
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      ...result,
    });
  } catch (err) {
    return res.status(500).json({
      is_success: false,
      user_id: makeUserId(FULL_NAME, DOB_DDMMYYYY),
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      message: "Internal Server Error",
    });
  }
}
