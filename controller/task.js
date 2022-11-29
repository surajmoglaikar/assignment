const HelperUtils = require("../utils/helpers");
const fs = require('fs');
const csv = require("fast-csv");
const Models = require("../models");
const db = require('../models/index');
const fileUpload = db.FileUpload;

 
const uploadMultipleFiles = async (req, res) => {
	  
	for (const file of req.files) {
        try{
            const csvParserStream = fs.createReadStream(__basedir + "/uploads/" + file.filename)
                        .pipe(csv.parse({ headers: true }));

            var end = new Promise(function(resolve, reject) {
                let csvFile = [];

                csvParserStream.on('data', object => {
                  csvFile.push(object);
                });
                csvParserStream.on('end', () => {
                    resolve(csvFile);
                });
                csvParserStream.on('error', error => {
                    console.error(error);
                    reject
                }); 
            });
            
            await (async function() {
                let csvFile = await end;

                // save customers to MySQL
                await fileUpload.bulkCreate(csvFile).then(() => {
                    const result = {
                        filename: file.originalname,
                    }
                    res.status(200).send(HelperUtils.successObj("file Upload Successfully!", result));
                }); 
            }());
        }catch(error){
            console.log(error);
            res.status(400).send(HelperUtils.errorObj("Somethig Went Wrong!", error.message));
        }
	}
}   
  
const addTask = async(req, res) => {
  try{ 

    let token = req.header("x-auth-token");
    var session = await  Models.Session.findOne({ 
      where: {
        sid: token,
   }
   });
    if (!session) 
    return res.status(400).send(HelperUtils.errorObj("token is invalid"));
    var query =  session.uid;
     var fields = req.body;                     
     if (fields.user) {
     var checkUser = await Models.task.findOne({where:{ user:query }});
     if (checkUser) {
   res.status(200).send(HelperUtils.errorObj("user already exist"));
}
}         
    let task = {
      title: req.body.title,
      due_date: req.body.due_date,
      file: req.body.file,
      user: query
  };
    await Models.Task.create(task);
  
  res.status(200).send(HelperUtils.successObj("task created successfuly.", task));
}
catch (err) {
  res.status(400).send(HelperUtils.errorObj("Somethig Went Wrong!", err.message));
}
}

const getTask =  async (req, res) => {
  let token = req.header("x-auth-token");
  var session = await  Models.Session.findOne({ 
    where: {
      sid: token,
 }
 });
  if (!session) 
  return res.status(400).send(HelperUtils.errorObj("token is invalid"));
  var query =  session.uid;
    let task = await Models.Task.findAll({
      where: {
        user: query,
   }
   });
    if (!task)
      return res.status(404).send(HelperUtils.successObj("No task Found"));
  
     return res.status(200).send(HelperUtils.successObj("task retrieved successfully", task));
    }


const putTask = async (req, res) => {
  let token = req.header("x-auth-token");
  var session = await  Models.Session.findOne({ 
    where: {
      sid: token,
 }
 });
  if (!session) 
  return res.status(400).send(HelperUtils.errorObj("token is invalid"));
  var query =  session.uid;

    var id= req.params.id;
    const task = {
      title: req.body.title,
      due_date: req.body.due_date,
      file: req.body.file
    }
    await Models.Task.update((task),{where:{id:id,user:query}},{ raw: true })
  if (!task)
      return res.status(404).send(HelperUtils.errorObj("NO task Found!"));

  res.status(200).send(HelperUtils.successObj("task  Updated successfully", task));
}

const deleteTask = async (req, res) => {
  let token = req.header("x-auth-token");
  var session = await  Models.Session.findOne({ 
    where: {
      sid: token,
 }
 });
  if (!session) 
  return res.status(400).send(HelperUtils.errorObj("token is invalid"));
  var query =  session.uid;
  var id =  req.params.id;
  let task = await Models.Task.destroy({
    where: {
      id:id,user:query
    },
  });
  if (!task) {
      return res.status(404).send(HelperUtils.errorObj("task Not Found"));
  }
  res.status(200).send(HelperUtils.successObj("task deleted sucessfully"));
}

module.exports = {
    getTask: getTask,
    addTask: addTask,
    putTask: putTask,
    deleteTask:deleteTask,
    uploadMultipleFiles: uploadMultipleFiles
}