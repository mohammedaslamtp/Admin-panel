const admin_model = require("../models/admins_model");
const user_model = require("../models/users_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const responseModel = {
  status: 404,
  data: null,
  message: "failed",
  authentication: false
};

module.exports = {
  admin_login: (req, res) => {
    const data = req.body;
    const response = responseModel;
    try {
      if (!data.username) {
        response.message = "Username or email is required!";
        res.status(201).json(response);
      } else if (!data.password) {
        response.message = "Password is required!";
        res.status(201).json(response);
      } else {
      }
    } catch (error) {}
  },

  user_login: (req, res) => {
    const data = req.body;
    const response = responseModel;
    try {
      if (!data.username) {
        response.message = "Username or email is required!";
        res.status(201).json(response);
      } else if (!data.password) {
        response.message = "Password is required!";
        res.status(201).json(response);
      } else {
        if (data.email && data.password) {
          user_model
            .findOne({ $or: [{ email: data.email }, { username: data.email }] })
            .then((result) => {
              console.log("email correct ", result);
              bcrypt.compare(data.password, result.password, (err, bcryptResult) => {
                if (err) {
                  // bcryption error
                  console.log("bcryption error try again");
                } else {
                  if (bcryptResult) {
                    response.data.password = true;

                    // blocked or not
                    if (!bcryptResult.is_blocked) {
                      response.data.access = true;
                      const adminData = {
                        username: bcryptResult.username,
                        full_name: bcryptResult.full_name,
                        email: bcryptResult.email,
                        password: bcryptResult.password
                      };

                      // giving 1 day expiration for jwt access token
                      const accessToken = jwt.sign(
                        adminData,
                        process.env.ACCESS_SECRET_TOKEN,
                        {
                          expiresIn: "24h"
                        }
                      );

                      response.data.accessToken = accessToken;
                      response.authentication = true;
                      response.status = 200;
                      response.message = "Signin successful";
                      result.is_active = true;
                      result.save();

                      res.status(200).json(response);
                    } else {
                      response.data.access = false;
                      response.message = "This account is blocked!";
                      res.status(201).json(response);
                    }
                  } else {
                    response.data.password = false;
                    response.message = "Username or password incorrect!";
                    res.status(201).json(response);
                  }
                }
              });
            })
            .catch((error) => {
              response.message = "Server maintenance!";
              console.log("email incorrect!, error:-- ", error);
              res.status(404).json(response);
            });
        }
      }
    } catch (e) {
      response.message = e.message;
      res.status(404).json(response);
    }
  }
};
