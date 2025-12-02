import { Request, Response } from "express";
import { todoServices } from "./todo.services";

// get single todo
const getSingleTodo = async (req: Request, res: Response) => {
    try {
        const result = await todoServices.getSingleTodoFromDB(req.params.id as string);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "todo not found" })
        }

        return res.status(200).json(result.rows[0]);
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// create a todo
const createTodo = async (req: Request, res: Response) => {
    const { user_id, title } = req.body;

    try {
        const result = await todoServices.createTodoInDB(user_id, title);

        res.status(500).json({
            success: false,
            message: "successfully inserted",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// update todo
const updateTodo = async (req: Request, res: Response) => {
    const { title } = req.body;
    try {
        const result = await todoServices.updateTodoInDB(title, req.params.id as string);

        res.status(200).json({
            success: true,
            message: "Successfully updated todo",
            updated: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const todoController = {
    getSingleTodo,
    createTodo,
    updateTodo,
}