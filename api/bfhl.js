export default function handler(req, res) {
    if (req.method === "GET") {
      res.status(200).json({
        operation_code: 1,
      });
    } else if (req.method === "POST") {
      const { data } = req.body;
  
      const numbers = data.filter((item) => !isNaN(item));
      const alphabets = data.filter((item) => isNaN(item));
      const highest_alphabet =
        alphabets.length > 0
          ? [alphabets.sort((a, b) => b.localeCompare(a))[0]]
          : [];
  
      res.status(200).json({
        is_success: true,
        user_id: "basil04_xyz", // change to your format
        email: "your_email@vitstudent.ac.in",
        roll_number: "22BCE0000",
        numbers,
        alphabets,
        highest_alphabet,
      });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
  