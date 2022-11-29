const bcrypt = require("bcrypt");
const HelperUtils = require("../utils/helpers");
const validateUser = require("../middleware/validate");
const Models = require("../models");
var path = require("path");
require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

//user registration
  const registration = async (req, res) => {
  try {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send(HelperUtils.errorObj(error.details[0].message));
      
    var fields = (req.body);
    if (fields.email) {
      let checkEmail = await Models.User.findOne({
        where: {
          email: fields.email.toLowerCase(),
        },
      });
      if (checkEmail) {
        return res.status(200).send(HelperUtils.errorObj("Email is already exsist."));
      }
    }
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,   
    };
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await Models.User.create(user);   

    return res.status(200).send(HelperUtils.successObj("User Added Successfully", user));
  } catch (err) {
    res.status(400).send(HelperUtils.errorObj("Somethig Went Wrong!", err.message));
  }
}

//user login
const login = async (req, res) => {
     const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send(HelperUtils.errorObj(error.details[0].message));
      let dbdata = await Models.User.findOne({
        where: {
          email: req.body.email
        },
      })
    if (!dbdata) {
      return res.status(400).send(HelperUtils.errorObj("Email/Password is invalid"));
    }
  
    const validPassword = await bcrypt.compare(req.body.password,dbdata.password);
     if (!validPassword) {
      return res.status(400).send(HelperUtils.errorObj("Email/Password is invalid"));
    }
     const token = HelperUtils.generateUUID();
      const sessionObj = {
       sid: token,
       email: dbdata.email,
       uid: dbdata.id
       };
    await Models.Session.create(sessionObj);
    res.send(HelperUtils.successObj("Login successfully", token));
  }

 const getUser =  async (req, res) => {
  let user = await Models.User.findAll();
  
    if (!user)
      return res.status(404).send(HelperUtils.successObj("No user Found"));

   return res.status(200).send(HelperUtils.successObj("user Data retrieved successfully", user));
  }
  
  const updateUser =   async (req, res) => {
    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send(HelperUtils.errorObj(error.details[0].message));
      var id = req.params.id;
      const dbdata = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,

      };
      const salt = await bcrypt.genSalt(10);
      dbdata.password = await bcrypt.hash(dbdata.password,salt)
      await Models.User.update((dbdata),{where:{id:id}},{ raw: true }
     );
    if (!dbdata)
      return res.status(404).send(HelperUtils.errorObj("NO user Found!"));

    res.status(200).send(HelperUtils.successObj("user updated sucessfully", dbdata));
  }
  
  const deleteUser = async (req, res) => {
    var id =  req.params.id;
    let user = await Models.User.destroy({
      where: {
        id:id,
      },
    });
    if (!user) {
      return res.status(404).send(HelperUtils.errorObj("user Not Found"));
    }
    res.status(200).send(HelperUtils.successObj("user deleted sucessfully"));
  }

  const logout = async (req, res) => {
    try {
      let token = req.header("x-auth-token");
      if (token) {
        let session = await Models.Session.findOne({
          where: {
            sid: token,
          },
        });
        if (session) {
          await Models.Session.destroy({
            where: {
              sid: token,
            },
          });
        }
      }
      return res.status(200).send(HelperUtils.successObj("successfully logout."));
    } catch (err) {
      res.status(400).send(HelperUtils.errorObj("Somethig Went Wrong!", err.message));
    }
  }
  
  module.exports = {
    registration:registration,
    login : login,
    getUser : getUser,
    updateUser :updateUser,
    deleteUser:deleteUser,
    logout : logout,
  }
  