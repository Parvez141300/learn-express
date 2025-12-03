import { Request, Response } from "express";
import { authServices } from "./auth.services";

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authServices.loginUserInDB(email, password);

        if (!result) {
            return res.status(200).json({
                success: false,
                message: "Login failed",
                data: result
            })
        }
        res.status(200).json({
            success: true,
            message: "Login Successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const authController = {
    loginUser,
}