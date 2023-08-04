const express = require("express");
const LikedPostIds = express.Router();

module.exports = function (con) {
  LikedPostIds.get("/:userid", async (req, res) => {
    const { userid } = req.params;
    console.log(userid);
    try {
      const result = await new Promise((resolve, reject) => {
        con.query("SELECT post_id FROM likes WHERE user_id = ?", [userid], (err, result) => {
          if (err){
            console.log(err);
            return;
          }
          return res.send(result);
          
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to fetch liked post ids" });
    }
  });

  return LikedPostIds;
};
