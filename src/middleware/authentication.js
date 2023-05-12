const demoMiddleware = async function (req, res, next) {
  console.log("Authentication Successfull");
  next();
};

module.exports = { demoMiddleware };

//middleware runs between request & response
//next : its basically a callback function
//pass the control to next middleware or next controller
//server flow will hang and does not pass the control

//authentication: check credentials (login Id, password)
//authorization: valid user
