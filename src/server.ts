import express, { NextFunction, Request, Response, json } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";

const app = express()
const port = config.port || 5000;



// parser
app.use(express.json())

// db initialize
initDB()
// root route of server
app.get('/', logger, (req: Request, res: Response) => {
    res.send('Hello Full Stack Developer!')
})

// user crud
app.use("/users", userRoutes);

// users crud
// app.post("/users", async (req: Request, res: Response) => {
//     const { name, email } = req.body;

//     try {
//         const result = await pool.query(
//             `INSERT INTO users(name, email) VALUES($1, $2) RETURNING *`, [name, email]);

//         console.log(result.rows[0]);
//         res.status(201).json({ success: true, message: "successfully inserted", data: result.rows[0] });
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// })

// get all users
// app.get("/users", async (req: Request, res: Response) => {
//     try {
//         const result = await pool.query(`
//             SELECT * FROM users
//             `);

//         res.status(200).json({
//             success: true,
//             message: "users successfully retrieved data",
//             data: result.rows
//         })
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message,
//             details: error
//         })
//     }
// })

// get single user
// app.get("/users/:id", async (req: Request, res: Response) => {
//     try {
//         const result = await pool.query(`
//             SELECT * FROM users WHERE id = $1
//             `, [req.params.id]);

//         if (result.rows.length === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "not found"
//             })
//         }
//         else {
//             res.status(200).json({
//                 success: true,
//                 message: "successfully fetched data",
//                 data: result.rows[0]
//             })
//         }
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// })

// update info of a user
// app.put("/users/:id", async (req: Request, res: Response) => {
//     const { name, email } = req.body;
//     try {
//         const result = await pool.query(`
//             UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *
//             `, [name, email, req.params.id]);

//         if (result.rows.length === 0) {
//             res.status(404).json({
//                 success: false,
//                 message: "not found"
//             })
//         }
//         else {
//             res.status(200).json({
//                 success: true,
//                 message: "successfully updated data",
//                 data: result.rows[0]
//             })
//         }
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// })

// delete a user
// app.delete("/users/:id", async (req: Request, res: Response) => {
//     try {
//         const result = await pool.query(`
//             DELETE FROM users WHERE id = $1
//             `, [req.params.id]);

//         if (result.rowCount === 1) {
//             res.status(200).json({
//                 success: true,
//                 message: "successfully deleted data",
//                 data: result.rows
//             })
//         }
//         else {
//             res.status(404).json({
//                 success: false,
//                 message: "not found"
//             })
//         }
//     } catch (error: any) {
//         res.status(500).json({
//             success: false,
//             message: error.message
//         })
//     }
// })

//* get single todos
app.get("/todos/:id", async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM todos WHERE id = $1", [req.params.id]);

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
})

//* todos post
app.post("/todos", async (req: Request, res: Response) => {
    const { user_id, title } = req.body;

    try {
        const result = await pool.query(`
            INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING * 
            `, [user_id, title]);

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
})

//* todos update
app.put("/todos/:id", async (req: Request, res: Response) => {
    const { title } = req.body;
    try {
        const result = await pool.query(`
            UPDATE todos SET title = $1 WHERE id=$2 RETURNING * 
            `, [title, req.params.id]);

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
})

// invalid route error handling middleware
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
        path: req.path
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
