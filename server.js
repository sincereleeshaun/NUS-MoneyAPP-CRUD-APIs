const express = require("express"); // import express package which will be used to create the backend service
const bodyParser = require("body-parser"); // import body-parser package which is used to parse the body's content from the request
const cors = require("cors");

// new router for users, accounts & transactions
const usersRouter = require("./routers/users");
const accountsRouter = require("./routers/accounts");
const transactionsRouter = require("./routers/transactions");


// create an instance of express which will start the server.
application = express();
application.use(cors());
application.use(bodyParser.json()); // use body parser to specify how to convert body's content.


application.use("/users", usersRouter); // tell the application to use mappings from the users router object
application.use("/accounts", accountsRouter); // tell the application to use mappings from the accounts router object
application.use("/transactions", transactionsRouter); // tell the application to use mappings from the transactions router object

// start the application on port 3000
application.listen(8000, (error) => {
  if (!error) {
    console.log("Application started succesfully");
  } else {
    console.log(error);
  }
});
