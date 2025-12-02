import express, { NextFunction, Request, Response, json } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";
import { todoRoutes } from "./modules/todo/todo.routes";

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
// todo crud
app.use("/todos", todoRoutes);


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
