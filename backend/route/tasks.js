import express from 'express';
import {deleteTask, getAllTasks, saveTask, updateTask} from "../controllers/TaskController.js";

//creating a router
const router = express.Router();

//api to get all the data
router.get('/:id', getAllTasks);

//api to save task
router.post('/', saveTask)

//api to update task
router.put('/:id', updateTask)

//api to delete task
router.delete('/:id', deleteTask)

export default router;