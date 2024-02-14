//import express
const express = require('express')

//import userController
const userController = require('../Controllers/userController')

//import projectController
const projectController = require('../Controllers/projectController')

//import middleware
const jwtMiddleware = require('../Middlewares/jwtMiddleware');

//import multer
const  multerConfig = require('../Middlewares/multerMiddleware')

//create a router object of express to define routes(path)
const router = new express.Router()

//using router object to define paths

//1 Register API routes - localhost:4000/register
router.post('/register',userController.register)

//2 login API routes - localhost:4000/register
router.post('/login',userController.login)

//3 add userProject API routes - localhost:4000/addProject
router.post ('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

//4 get user project api route - localhost:4000/user/all-project
router.get('/project/all-user-projects',jwtMiddleware,projectController.getUserProject)

//5 get all project routes - localhost:4000/projects/all-project
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProject)

//6 get home project routes - localhost:4000/projects/home-projects
router.get('/project/home-projects',projectController.getHomeProject)

//7 update project - localhost:4000/project/update-project/7644653666
router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

//8 delete project - localhost:4000/project/delete-project/:id
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)

//export
module.exports = router

