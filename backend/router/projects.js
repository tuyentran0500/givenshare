const express = require("express");
var mongoose = require('mongoose');
const router = express.Router();
const ProjectModel = require("../models/projects");
const { UserModel } = require("../models/users");

const { S3Client } = require('@aws-sdk/client-s3')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  });

//  set up multer for storing uploaded files
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'givenshare',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, "public/uploads/projectsMedia/" + Date.now().toString() + "_" + file.originalname)
    }
  })
})


async function postHandler(req, res) {
  const {title, subTitle, category, endDate, goal, description} = req.body
  const author = JSON.parse(req.body.author) 

  const project = new ProjectModel({
    title, subTitle, category, endDate, goal, description,
    coverURL: req.files.cover[0].location,
    visualMedias: req.files.visualMedias ? req.files.visualMedias.map((media) => media.location) : [],
    author: author, // store all information about the author at that moment in Project
    backers: new Map()
  });  
  
  try {
    const newProject = await project.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
}

async function getProjectById(req, res, next) {
  // middleware
  let project;
  try {
    project = await ProjectModel.findById(req.params.id);
    if (project === null) {
      return res.status(404).json({ message: "Cannot find the project" });
    }
    project.author = await UserModel.findById(project.author._id)
    if (project.author === null) {
      return res.status(404).json({ message: "Cannot find the author of the project" });
    }
    
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.project = project;
  next();
}


// Get features project: Projects with the most donation currently.
router.get("/features", async (req, res) => {
  try {
    const projects = await ProjectModel.aggregate([
      {      
        $addFields: {
          daysLeft: {
            $dateDiff:
            {
                startDate: new Date(Date.now()),
                endDate: "$endDate",
                unit: "day"
            }
          }
        }
      },
      {
        $match : {
          daysLeft : {
            $gte : 0
          }
        }
      },
      {
        $sort : {currentProgress : -1}
      },
    ]);
    // Update project based on new user profile
    for (const id in projects.slice(0, 5)){
      try {
        projects[id].author = await UserModel.findById(projects[id].author._id)
      }
      catch (err){
        console.log("Cannot find author of project " +  projects[id]._id)
        res.status(404).json({ message: err.message });
      }
    }
    res.json(projects.slice(0, 5));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get final stretch projects: Sort project by the largest completion progress: currentProgress / goal
router.get("/final-stretch/:startIndex", async (req, res) => {
  const startIndex = parseInt(req.params.startIndex)
  try {
    const projects = await ProjectModel.aggregate([
      {
        $addFields: { completionProgress:
          { $divide: [ "$currentProgress", "$goal" ] } }
        },
      // TODO: Find a better way to compare two dates
      {      
        $addFields: {
          daysLeft: {
            $dateDiff:
            {
                startDate: new Date(Date.now()),
                endDate: "$endDate",
                unit: "day"
            }
          }
        }
      },
      {
        $match : {
          daysLeft : {
            $gte : 0
          }
        }
      },
      {
        $match : {
          completionProgress : {
            $lt : 1
          }
        }
      },
    ])
    .sort({completionProgress : -1, _id: 1 })
    .skip(startIndex)
    .limit(4);
    // Update project based on new user profile
    for (const id in projects){
      try {
        projects[id].author = await UserModel.findById(projects[id].author._id)
      }
      catch (err){
        console.log("Cannot find author of project " +  projects[id]._id)
        res.status(404).json({ message: err.message });
      }
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get soon to miss project
router.get("/soon-to-miss/:startIndex", async (req, res) => {
  const startIndex = parseInt(req.params.startIndex)
  try {
    const projects = await ProjectModel.aggregate([
      {      
        $addFields: {
          daysLeft: {
            $dateDiff:
            {
                startDate: new Date(Date.now()),
                endDate: "$endDate",
                unit: "day"
            }
          }
        }
      },
      {
        $match : {
          daysLeft : {
            $gte : 0
          }
        }
      },
    ])
    .sort({daysLeft : 1, _id: 1})
    .skip(startIndex)
    .limit(3);
    // Update project based on new user profile
    for (const id in projects){
      try {
        projects[id].author = await UserModel.findById(projects[id].author._id)
      }
      catch (err){
        console.log("Cannot find author of project " +  projects[id]._id)
        res.status(404).json({ message: err.message });
      }
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get projects created by a user with id
router.get("/created-by/:id", async (req, res) => {
  try {
    const projects = await ProjectModel.find({"author._id" : req.params.id });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// get projects backed by a user with id
router.get("/backed-by/:id", async (req, res) => {
  try {
    const backerKey = `backers.${req.params.id}`
    const projects = await ProjectModel.find().exists(backerKey);
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get all
router.get("/", async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one
router.get("/:id", getProjectById, (req, res) => {
  res.send(res.project);
});

// Post new one
router.post("/", upload.fields([{
  name: 'cover', maxCount: 1
}, {
  name: 'visualMedias', maxCount: 5
}]), postHandler);

// Delete one
router.delete("/:id", getProjectById, async (req, res) => {
  try {
    await res.project.remove();
    res.json({ message: "Deleted " + res.project.title });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update one
router.patch("/:id", getProjectById, async (req, res) => {
  if (req.body.title != null) {
    res.project.title = req.body.title;
  }
  if (req.body.category != null) {
    res.project.category = req.body.category;
  }

  try {
    const updatedProject = await res.project.save();
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;