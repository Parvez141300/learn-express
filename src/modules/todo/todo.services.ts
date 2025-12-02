import { pool } from "../../config/db";

const getSingleTodoFromDB = async (id: string) => {
    const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
    return result;
}

const createTodoInDB = async (user_id: number, title: string) => {
    const result = await pool.query(`
        INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING * 
        `, [user_id, title]);
    return result;
}

const updateTodoInDB = async (title: string, id: string) => {
    const result = await pool.query(`
        UPDATE todos SET title = $1 WHERE id=$2 RETURNING * 
        `, [title, id]);

        return result;
}

export const todoServices = {
    getSingleTodoFromDB,
    createTodoInDB,
    updateTodoInDB,
}