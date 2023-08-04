const express = require("express");
const router = express.Router();

module.exports = function (con) {
  router.post('/', (req, res) => {
    const { email, password, name } = req.body;
    con.query("SELECT name FROM login WHERE email = ?", [email], (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send({ error: "Something went wrong!" });
      }

      if (data && data.length > 0) {
        return res.send({ already: "User already exists!" });
      }

      con.query("INSERT INTO login (email, password, name) VALUES (?, ?, ?)", [email, password, name], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send({ error: "Something went wrong!" });
        }
        return res.send({ success: "Registered Successfully!" });
      });
    });
  });

  return router;
};
