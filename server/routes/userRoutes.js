import express from "express";
import { auth } from "../middlewares/auth.js";
import { getPublishedCreations, getUserCreations, toggleLikecreations } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.get('/get-user-creations', auth, getUserCreations);
userRoutes.get('/get-published-creations', auth, getPublishedCreations);
userRoutes.post('/toggle-like-creation', auth, toggleLikecreations);

export default userRoutes;