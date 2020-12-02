const express = require("express");
const connection = require("../database"); // import connection object from database.js

// create a Router object to define URI mappings.
router = express.Router();

// URI mapping to add a new transaction into the Transactions table.
router.post("/", (request, response) => {
  // validate account number
  if (request.body.account_number == null || request.body.account_number == "" || request.body.account_number === undefined) {
    response.status(400).send("Invalid Account Number");
    return;
  }

  connection.query(
    `insert into Transactions (date, transaction_type, account_number, amount) values (CURDATE(), '${request.body.transaction_type}', '${request.body.account_number}', '${request.body.amount}')`,
    (errors, results) => {
        if(errors) {
            console.log(errors);
            response.status(400).send("Server error.");
        } else {            
      // Populate the response with a success message.
      response.send("New transaction registered successfully!");
        }
    }
  )});

// URI mapping to display all transactions from Transactions table.
router.get("/", (request, response) => {
  
  connection.query(`select * from Transactions`, (errors, results) => {
    if (errors) {
      console.log(errors);
      response.status(400).send("Server error.");
    } else {
    // populate the response object with the results received from mysql server.
    response.send(results);
    }

  });
});

// URI mapping to display a transaction based on the transaction ID in the request.
router.get("/:transactionId", (request, response) => {
// validate transaction ID input.  
  if (request.params.transactionId == null || !Number.isInteger(parseInt(request.params.transactionId))) {
    response.status(400).send("Invalid Transaction ID.");
    return;
  }

  connection.query(
    `select * from Transactions where transaction_id = ${request.params.transactionId}`,
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


// URI mapping to display all transactions based on an account number in the request.
router.get("/acc/:accountNumber", (request, response) => {
  // validate account number input.  
    if (request.params.accountNumber == null || !Number.isInteger(parseInt(request.params.accountNumber))) {
      response.status(400).send("Invalid Account Number.");
      return;
    }
  
    connection.query(
      `select * from Transactions where account_number = ${request.params.accountNumber}`,
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