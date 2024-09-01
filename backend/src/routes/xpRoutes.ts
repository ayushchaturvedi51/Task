import express from "express";
import { sendMail } from "../helper/sendMail";
import dbservices from "../services/dbservices";
import { Admin } from "../services/dbservices/admin";
import controllers from "../controllers";
import authenticateUser from "../services/authenticate";

const router = express.Router();


router.post("/award",authenticateUser,controllers.xpController.reward);


export default router

