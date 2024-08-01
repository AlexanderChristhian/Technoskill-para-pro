const pg = require("../utils/connect");

exports.register = async function register(req, res) {
  try {
    const { name, email, password } = req.body;
    const response = await pg.query(
      "INSERT INTO employee (name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, division, salary]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.login = async function login(req, res) {
  // Insert kode LOGIN di sini
  try {
    const { name, password } = req.body;
    const response = await pg.query(
      "SELECT * FROM manager WHERE name = $1 AND password = $2",
      [name, password]
    );
    if (response.rows.length === 0) throw new Error("Failed to login");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};
