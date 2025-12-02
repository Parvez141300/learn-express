import { Request, Response } from "express";
import { userServices } from "./user.service";

// create user
const createUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
        const result = await userServices.createUserInDB(name, email);

        res.status(201).json({ success: true, message: "successfully inserted", data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get all user
const getUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getUserFromDB();

        res.status(200).json({
            success: true,
            message: "users successfully retrieved data",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}

// get single user
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getSingleUserFromDB(req.params.id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "successfully fetched data",
                data: result.rows[0]
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// update a user
const updateUser = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    try {
        const result = await userServices.updateUserInDB(name, email, req.params.id as string);

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "not found"
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: "successfully updated data",
                data: result.rows[0]
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// delete a user
const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.deleteUserInDB(req.params.id as string)

        if (result.rowCount === 1) {
            res.status(200).json({
                success: true,
                message: "successfully deleted data",
                data: result.rows
            })
        }
        else {
            res.status(404).json({
                success: false,
                message: "not found"
            })
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const userControllers = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
}