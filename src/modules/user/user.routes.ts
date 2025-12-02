import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

// post a user
router.post("/", userControllers.createUser);
// get all user
router.get("/", userControllers.getUser);
// get single user
router.get("/:id", userControllers.getSingleUser);
// update a user
router.put("/:id", userControllers.updateUser);
// delete a user
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;