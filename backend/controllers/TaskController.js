import {taskModel} from "../models/task.model.js";

// function to get all the tasks by user
export const getAllTasks = async (req, res) => {
    try {
        const allData = await taskModel.find({
            userId: req.params.id,
            status: { $ne: "completed" }
        });
        // Check if the task exists
        if (!allData || allData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "All data",
            data: allData
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
    }
}

//function to save task
export const saveTask = async (req,res) => {
    try {
        const task = new taskModel(req.body);
        await task.save();
        return res.status(200).json({
            success: true,
            message: "task saved!",
        })

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//function to update task
export const updateTask = async (req,res) => {

    try {
        // Check if the task exists
        const task = await taskModel.findById({_id:req.params.id});

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        // Update task fields based on request body
        task.title = req.body.title || task.title;
        task.date = req.body.date || task.date;
        task.priority = req.body.priority || task.priority;
        task.status = req.body.status || task.status;

        await task.save();
        return res.status(200).json({
            success: true,
            message: "Task updated successfully",
        });
    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

//function to delete task
export const deleteTask = async (req,res) => {
    try {
        // Check if the task exists
        const taskFind = await taskModel.find({_id:req.params.id});

        if (!taskFind || taskFind.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No task found"
            });
        }

        await taskFind[0].deleteOne();

        return res.status(200).json({
            success: true,
            message: "task deleted.",
        })

    } catch (e) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}
