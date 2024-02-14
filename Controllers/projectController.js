const projects = require("../Models/projectSchema");

//add project logic
exports.addUserProject = async (req, res) => {
  console.log("inside addUserproject");
  // res.status(200).json("add userProject request")
  //user id get
  const userId = req.payload;
  //get add project details
  const { title, language, github, link, overview } = req.body;

  //get image
  const projectImage = req.file.filename;
  console.log(projectImage);

  //logic to adding new user project
  try {
    const existingProject = await projects.findOne({ github });
    if (existingProject) {
      res.status(406).json("project already exist");
    } else {
      const newProject = new projects({
        title,
        language,
        github,
        link,
        overview,
        projectImage,
        userId,
      });
      await newProject.save(); //save ne wproject details into mongodb
      res.status(200).json(newProject); //send response to the client
    }
  } catch (err) {
    res.status(404).json({ meaasge: err.message });
  }
};

//1)get user project
exports.getUserProject = async (req, res) => {
  //get user id
  const userId = req.payload;
  //api request
  try {
    //get project info of perticular user
    const userProject = await projects.find({ userId });
    console.log(userProject);
    res.status(200).json(userProject); //send response to the client
  } catch (err) {
    res.status(401).json(err.message);
  }
};

//2)get all projects
exports.getAllProject = async (req, res) => {
  const searchKey = req.query.search
  const query = {
    language:{
      $regex: searchKey,
      $options: "i"
    }
  }
  try {
    const AllProjects = await projects.find(query)
    res.status(200).json(AllProjects)
  } catch (err) {
    res.status(401).json(err.message)
  }
};

//3)get home project
exports.getHomeProject = async (req, res) => {
  try {
    const HomeProjects = await projects.find().limit(3);
    res.status(200).json(HomeProjects);
  } catch (err) {
    res.status(401).json(err.message);
  }
};

//Edit project
exports.editProject = async (req, res) => {
  const { title, language, github, link, overview, projectImage } = req.body;

  const uploadImage = req.file ? req.filename : projectImage;

  const userId = req.payload;

  const { id } = req.params;

  try {
    //find the perticular project id in the mongobd and add the uploaded project details
    const updateProject = await projects.findByIdAndUpdate(
      { _id: id },
      {
        title,
        language,
        github,
        link,
        overview,
        projectImage: uploadImage,
        userId,
      },
      { new: true }
    );
    //save the updated project
    await updateProject.save();
    res.status(200).json(updateProject);
  } catch (err) {
    res.status(401).json(err);
  }
};

//delete project
exports.deleteProject = async (req, res) => {
  const { pid } = req.params;
  try {
    const deleteData = await projects.findByIdAndDelete({ _id: pid });
    res.status(200).json(deleteData);
  } catch (err) {
    res.status(401).json(err);
  }
};
