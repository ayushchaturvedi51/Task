import { Request, Response } from "express";
import dbservices from "../services/dbservices";

export class achievementsController {
    
    static allachievements = async (req: Request, res: Response): Promise<any> => {
        try {
            const userId=req["user"]["userId"]
            const achievements = await dbservices.achievementsController.getAllAchievements(userId);
            if (!achievements) {
                return res.status(404).send({ status: false, message: "No Achievements found" });
            }
            return res.status(200).send({ status: true, message: "All Achievements", data: achievements });
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message });
        }
    }

    
    static specificAchievements = async (req: Request, res: Response): Promise<any> => {
        try {
            const userId=req["user"]["userId"]
            const achievementId = parseInt(req.params.id);
            const updateAchievement = await dbservices.achievementsController.getachievement(userId,achievementId);
            return res.status(200).json({ status: true, message: "Data fetched", updateAchievement });
        } catch (error) {
            return res.status(500).send({ status: false, message: error.message });
        }
    }
}
