const express = require("express");
const connection = require("../database"); // import connection object from database.js

// create a Router object to define URI mappings.
router = express.Router();


// URI mapping to create and add a new account into the Accounts table.
router.post("/", (request, response) => {
  // validate account_number
  if (request.body.account_number == null || request.body.account_number == "" || request.body.account_number === undefined) {
    response.status(400).send("Invalid Account");
    return;
  }

  connection.query(
    `insert into Accounts (account_number, account_type, user_id, balance, max_limit, date_created) values ('${request.body.account_number}', '${request.body.account_type}', '${request.body.user_id}', '${request.body.balance}', '${request.body.max_limit}', CURDATE())`,
    (errors, results) => {
        if(errors) {
            console.log(errors);
            response.status(400).send("Server error.");
        } else {            
      // Populate the response with a success message.
      response.send("New account created successfully!");
        }
    }
  )});


// URI mapping to retrieve all accounts
router.get("/", (request, response) => {
  // in the callback function, use mysql connection to execute select query
  connection.query(`select * from Accounts`, (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(400).send("Server error.");
    } else {
    // populate the response object with the results received from mysql server.
    response.send(results);
    }

  });
});

// URI mapping to display account with an id specified in the request
router.get("/:userId", (request, response) => {
  // in the callback function, use mysql connection to execute select query
  if (request.params.userId == null || !Number.isInteger(parseInt(request.params.userId))) {
    response.status(400).send("Invalid ID.");
    return;
  }

  connection.query(
    `select * from Accounts where user_id = ${request.params.userId}`,
    (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(400).send("Server error.");
      } else {
      // populate the response object with the results received from mysql server.
      response.send(results);
    }
  });
});


module.exports = router;