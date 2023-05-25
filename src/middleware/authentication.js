const jwt = require("jsonwebtoken");
const customerModel = require("../model/customerModel");
const { ObjectId } = require("mongoose").Types;

const authenticateToken = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    // authorization && token
    if (!token) {
      res.send({ message: "please login first && please try after sometime" });
    }

    console.log(token, "token");

    let decodedToken = jwt.verify(
      token,
      "Secrete_Key",
      function (error, decoded) {
        if (error) {
          res.send({ message: error.message });
        } else {
          tokenCheck = decoded;
        }
      }
    );

    req.token = tokenCheck;
    next();
  } catch (error) {
    console.log(error);
  }
};

const authorization = async function (req, res, next) {
  try {
    idFromToken = tokenCheck.customerId;

    console.log("idFromToken", idFromToken);

    const loginCustomer = req.params.customerId;

    const checkCustomerId = await customerModel.findById({
      _id: new ObjectId(loginCustomer),
    });

    if (!checkCustomerId) {
      res.status(404).send({ status: false, message: "customer not found" });
    }

    console.log("checkCustomerId", checkCustomerId);

    let loggedInCustomer = checkCustomerId._id.toString();

    console.log("loggedInCustomer", loggedInCustomer);

    if (loggedInCustomer !== idFromToken) {
      res
        .status(403)
        .send({ status: false, message: "authorization failed // forbidden" });
    } else {
      next();
    }
  } catch (error) {
    res.status(400).send({ status: false, message: error.message });
  }
};

module.exports = { authenticateToken, authorization };

//middleware runs between request & response
//next : its basically a callback function
//pass the control to next middleware or next controller
//server flow will hang and does not pass the control

//authentication: check credentials (login Id, password)
//authorization: valid user

// header: algorithms
//payload: data=> key value pairs
//signature: combination of algorithm and signature

//status code=> status code issued by a server in response to a (client) request made to the server

// Informational responses (100–199)
// Successful responses (200–299)
// Redirects (300–399)
// Client errors (400–499)
// Server errors (500–599)

// 200 OK.or success
// 201 Created. ...
// 202 Accepted
// 204 No Content. ...
// 302 redirecting
// 400 Bad Request. ...
// 401 Unauntheticated. ...
// 403  or unauthorised. ...
// 404 Not Found. ...
// 409 conflicts
// 500 Internal Server Error.

// types of middleware =>5
//1 global middleware/ application middleware ex. app.use and app.listen
//2 router base/level middleware => authentication / authorization

//3 built in middleware => ex let, var, const
//4 3rd party middleware => 3rd party package install
//5 error handling middleware => ex. something went wrong

//restricted API's => api's with middleware or API's with authentication and autherization ex login
//open to all API's => API's with without middleware ex. signUp/Register
