import express, { Request, Response } from "express";
import { pool } from "../../config/db";

const router = express.Router();

// post a user
router.post("/", async (req: Request, res: Response) => {
    const { name, email } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email]);

        console.log(result.rows[0]);
        res.status(201).json({ success: true, message: "successfully inserted", data: result.rows[0] });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// get all user
router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await pool.query(`
            SELECT * FROM users
            `);

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
})

export const userRoutes = router;