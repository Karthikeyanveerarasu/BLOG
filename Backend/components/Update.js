const express = require('express');
const Update = express.Router();

// ... (require statements, etc.)

module.exports = function (con) {
    Update.post("/", (req, res) => {
        const {
            oldtitle,
            oldcontent,
            oldimage,
            updatedtitle,
            updatedcontent,
            updatedImage,
            email
        } = req.body;


        let updateQuery = "UPDATE posts SET";
        const updateValues = [];

        if (updatedtitle !== oldtitle) {
            console.log("first");
            updateQuery += " title = ?,";
            updateValues.push(updatedtitle);
        }

        if (updatedcontent !== oldcontent) {
            console.log("sec");
            updateQuery += " content = ?,";
            updateValues.push(updatedcontent);
        }

        if (updatedImage !== oldimage) {
            console.log("3");
            updateQuery += " image = ?,";
            updateValues.push(updatedImage);
        }

        // Remove the trailing comma (,) from the updateQuery if there are changes
        if (updateValues.length > 0) {
            updateQuery = updateQuery.slice(0, -1);
            updateQuery += " WHERE email = ? AND title = ? AND content = ? AND image = ?";
            updateValues.push(email, oldtitle, oldcontent, oldimage);
            con.query(updateQuery, updateValues, (err, result) => {
                console.log(err);
                if (err) {
                    // Handle the error appropriately
                    return res.status(500).json({ error: "Failed to update data." });
                }
                console.log("success")
                return res.status(200).json({ message: "Data updated successfully." });
            });
        } else {
            // If no changes detected, return a response indicating no changes were made.
            return res.status(200).json({ message: "No changes were made." });
        }
    });

    return Update;
};

