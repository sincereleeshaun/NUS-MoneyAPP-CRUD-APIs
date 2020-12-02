const express = require("express");
const connection = require("../database"); // import connection object from database.js

// create a Router object to define URI mappings.
router = express.Router();

// URI mapping to add a new user into the Users table.
router.post("/", (request, response) => {
    // validate name
    if (request.body.name == null || request.body.name == "" || request.body.name === undefined) {
      response.status(400).send("Invalid Name");
      return;
    }

    connection.query(
      `insert into Users (name, email, mobile, ic_number, password) values ('${request.body.name}', '${request.body.email}', '${request.body.mobile}', '${request.body.ic_number}', '${request.body.password}')`,
      (errors, results) => {
          if(errors) {
              console.log(errors);
              response.status(400).send("Server error.");
          } else {            
        // Populate the response with a success message.
        response.send("New user inserted successfully!");
          }
      }
    )});
  
// URI mapping to display all users from Users table.
router.get("/", (request, response) => {
    // in the callback function, use mysql connection to execute select query
    connection.query(`select user_id, name, email, mobile from Users`, (errors, results) => {
      if (errors) {
        console.log(errors);
        response.status(400).send("Server error.");
      } else {
      // populate the response object with the results received from mysql server.
      response.send(results);
      }
  
    });
  });
  
// URI mapping to display user with an id specified in the request
router.get("/:userId", (request, response) => {
    // in the callback function, use mysql connection to execute select query
    if (request.params.userId == null || !Number.isInteger(parseInt(request.params.userId))) {
      response.status(400).send("Invalid ID.");
      return;
    }
  
    connection.query(
      `select user_id, name, email, mobile from Users where user_id = ${request.params.userId}`,
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
  

  // URI mapping to update an existing user into the Users table.
  router.put("/:userId", (request, response) => {
    // in the callback function, use mysql connection to execute select query
    if (request.params.userId == null || !Number.isInteger(parseInt(request.params.userId))) {
        response.status(400).send("Invalid ID.");
        return;
      }
      // retrieves fields that are passed
      var post  = request.body;

    connection.query(
        // inject fields into query string.
        `update Users set ? where user_id = ${request.params.userId}`, [post],
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(400).send("Server error.");
        } else {
          // Populate the response with a success message
          response.send("User data updated successfully!");
        }
      }
    );
  });
  
  // URI mapping to delete an existing user from the Users table.
  router.delete("/:userId", (request, response) => {
    // in the callback function, use mysql connection to execute select query
    connection.query(
      `delete from Users where user_id = ${request.params.userId}`,
      (errors, results) => {
        if (errors) {
          console.log(errors);
          response.status(400).send("Server error.");
        } else {
          // Populate the response with a success message
          response.send("User has been successfully removed!");
        }
      }
    );
  });


  module.exports = router;