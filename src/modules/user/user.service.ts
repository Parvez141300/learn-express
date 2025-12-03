import { pool } from "../../config/db";

// create a user in db
const createUserInDB = async (payload: Record<string, unknown>) => {
    const {name, email, password} = payload;
    const result = await pool.query(
        `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *`, [name, email, password]);

    return result;
}

// get all user from db
const getUserFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM users
        `);

    return result;
}

// get single user from db
const getSingleUserFromDB = async (id: string) => {
    const result = await pool.query(`
        SELECT * FROM users WHERE id = $1
        `, [id]);
    return result;
}

// update a user in db
const updateUserInDB = async (name: string, email: string, id: string) => {
    const result = await pool.query(`
        UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *
        `, [name, email, id]);
    return result;
}

// delete a user in db
const deleteUserInDB = async (id: string) => {
    const result = await pool.query(`
        DELETE FROM users WHERE id = $1
        `, [id]);
    return result;
}

export const userServices = {
    createUserInDB,
    getUserFromDB,
    getSingleUserFromDB,
    updateUserInDB,
    deleteUserInDB,
}