import db from '../Module/db.js';

export const AddTask = async (req, res, next) => {
    try {
        const { Title, Description } = req.body;

        if (!Title || !Description) {
            return res.status(400).json({
                success: false,
                message: "Please enter all fields"
            });
        }

        const Add_Query = 'INSERT INTO TASKS (Title, Description) VALUES (?, ?)';
        const [result] = await db.execute(Add_Query, [Title, Description]);

        if (result.affectedRows > 0) {
            return res.status(201).json({
                success: true,
                message: "Task added successfully",
                taskId: result.insertId
            });
        } else {
            return res.status(500).json({
                success: false,
                message: "Please try again later"
            });
        }
    } catch (err) {
        next(err);
    }
};

export const UpdateTask = async (req, res, next) => {
    try {
        const { id, Title, Description } = req.body;

        if (!id || !Title || !Description) {
            return res.status(400).json({
                success: false,
                message: "Please enter all required fields (id, Title, Description)"
            });
        }

        const Update_Query = 'UPDATE TASKS SET Title = ?, Description = ? WHERE ID = ?';
        const [result] = await db.execute(Update_Query, [Title, Description, id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: "Task updated successfully"
            });
        } else {
            return res.status(404).json({
                success: false,
                message: `No task found with ID ${id}`
            });
        }
    } catch (err) {
        next(err);
    }
};

export const GetTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const Get_Query = 'SELECT * FROM TASKS WHERE ID = ?';
        const [result] = await db.query(Get_Query, [id]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Task retrieved successfully",
                task: result[0]
            });
        } else {
            return res.status(404).json({
                success: false,
                message: `No task found with ID ${id}`
            });
        }
    } catch (err) {
        next(err);
    }
};

export const GetAllTasks = async (req, res, next) => {
    try {
        const Get_Query = 'SELECT * FROM TASKS';
        const [result] = await db.query(Get_Query);

        return res.status(200).json({
            success: true,
            message: "Tasks retrieved successfully",
            tasks: result
        });
    } catch (err) {
        next(err);
    }
};



export const CompleteTask = async (req, res, next) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Task ID is required"
            });
        }

        const Update_Query = 'UPDATE TASKS SET STATUS = "completed" WHERE ID = ?';
        const [result] = await db.execute(Update_Query, [id]);

        if (result.affectedRows > 0) {
            return res.status(200).json({
                success: true,
                message: "Task marked as completed"
            });
        } else {
            return res.status(404).json({
                success: false,
                message: `No task found with ID ${id}`
            });
        }
    } catch (err) {
        next(err);
    }
};


export default { AddTask, UpdateTask, GetAllTasks, GetTaskById ,CompleteTask};
