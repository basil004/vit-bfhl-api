const express = require('express');
const app = express();
app.use(express.json());

// Replace these with YOUR details
const user_id = "basil_shaiju_04122004"; // YOUR_NAME_DDMMYYYY
const email = "basil.shaiju2022@vitstudent.ac.in"; // YOUR_EMAIL
const roll_number = "22bci0064"; // YOUR_ROLL_NUMBER

// Helper functions
const isNumber = str => !isNaN(str) && !isNaN(parseFloat(str));
const isAlphabet = str => /^[a-zA-Z]+$/.test(str);

app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    if (!Array.isArray(data)) {
      return res.status(400).json({ is_success: false, message: "Invalid data" });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    // Process each item
    data.forEach(item => {
      if (isNumber(item)) {
        const num = parseInt(item);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item);
        } else {
          odd_numbers.push(item);
        }
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    // Create concat string: all alphabets reversed with alternating caps
    const allChars = alphabets.join('').split('').reverse();
    const concat_string = allChars.map((char, index) => 
      index % 2 === 0 ? char.toLowerCase() : char.toUpperCase()
    ).join('');

    return res.status(200).json({
      is_success: true,
      user_id,
      email,
      roll_number,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string
    });
    
  } catch (error) {
    return res.status(500).json({ is_success: false, message: error.message });
  }
});

// Optional GET route for testing
app.get('/bfhl', (req, res) => {
  res.json({ operation_code: 1 });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
