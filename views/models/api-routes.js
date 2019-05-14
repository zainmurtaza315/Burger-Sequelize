var Burgers = require("../models/burger.js");

module.exports = function(app) {
  app.get("/", function(req, res) {
    connection.query("SELECT * FROM burgers;", function(err, data) {
      if (err) {
        return res.status(500).end();
      }

      res.render("index", { burgers: data });
    });
  });

  // Create a new order
  app.post("/order", function(req, res) {
    connection.query(
      "INSERT INTO burgers (burgers) VALUES (?)",
      [req.body.burgers],
      function(err, result) {
        if (err) {
          return res.status(500).end();
        }

        // Send back the ID of the new burgers
        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
      }
    );
  });

  // Update an order
  app.put("/order/:id", function(req, res) {
    connection.query(
      "UPDATE burgers SET plan = ? WHERE id = ?",
      [req.body.burgers, req.params.id],
      function(err, result) {
        if (err) {
          // If an error occurred, send a generic server failure
          return res.status(500).end();
        } else if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      }
    );
  });

  // Delete a Order
  app.delete("/order/:id", function(req, res) {
    connection.query(
      "DELETE FROM burgers WHERE id = ?",
      [req.params.id],
      function(err, result) {
        if (err) {
          // If an error occurred, send a generic server failure
          return res.status(500).end();
        } else if (result.affectedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        res.status(200).end();
      }
    );
  });
};
